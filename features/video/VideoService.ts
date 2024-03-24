import {Video} from "../../core/entities/videoEntitie";
import {AppDataSource} from "../../app";
import {CustomVideoError} from "./validation/VideoErrors";
import axios from 'axios';
import {User} from "../../core/entities/userEntitie";
import {CustomUserError} from "../login/validation/UserErrors";
import {VideoValidations} from "./validation/VideoValidations";

export default class VideoService {
    async postVideo(userId: string, video_link: string) {
        const id = parseInt(userId);
        const user = await User.findOne({where: {id: id}});
        if (!user)
            throw CustomUserError.UsuarioNaoExiste(404, "Usuario Nao Existe");
        try {
            const {title, duration} = await this.getYouTubeVideoInfo(video_link, 'AIzaSyAP8NzNyRNglRy0lOJR8thFiRJzCfL6Oe0');
            const newVideo: Video = new Video();
            newVideo.title = title;
            newVideo.total_time = duration;
            newVideo.video_link = video_link;
            newVideo.watched_time = 0;
            newVideo.user = user;
            await VideoValidations.isValidVideoInfos(title,duration);
            await AppDataSource.manager.save(newVideo);

            return {
                title: newVideo.title,
                total_time: newVideo.total_time,
                video_link: newVideo.video_link,
            } ;
        } catch (error) {
            throw error;
        }
    }
  //READ
    async getAllVideosByID(userId: string): Promise<Video[]> {
        const id: number = parseInt(userId);
        const user: User | null = await User.findOne({ where: { id: id } });
        if (!user)
            throw CustomUserError.UsuarioNaoExiste(404, "Usuario nao Existe Usuario Com Esse ID");

        const videos :Video[] = await Video.find({ where: { user: user } });
            if (!videos || videos.length === 0)
                throw CustomVideoError.UsuarioSemHistorico(404, "Usuário não tem vídeos a serem exibidos");

        return videos;
    }

    //DELETE
    async deleteAllVideos(userId: string): Promise<void> {
        const id: number = parseInt(userId);
        const user: User | null = await User.findOne({ where: { id: id } });
        if (!user)
            throw CustomUserError.UsuarioNaoExiste(404, "ID não cadastrado no sistema");
        try {
            await Video.delete({ user: user  });
        } catch (error) {
            throw CustomVideoError.ErroDeRegistro(500, "Erro Interno Ao Cadastrar Video No Banco De Dados");
        }
    }
    async deleteVideo(userId: string, videoLink: string): Promise<void> {
        const id: number = parseInt(userId);
        const user: User | null = await User.findOne({ where: { id: id } });
        if (!user)
            throw CustomUserError.UsuarioNaoExiste(404, "ID não cadastrado no sistema");

        const video = await Video.findOne({where: {user: user, video_link: videoLink}})

        if (video === null)
            throw CustomVideoError.VideoNaoExiste(404, "Video Nao Existe No Historico Deste Usuario");
        try {
            await Video.delete({ user: user, video_link: videoLink });
        } catch (error) {
            throw CustomVideoError.ErroDeRegistro(500, "Erro Interno Ao Deletar Video No Banco De Dados");
        }
    }

  //auxiliaries methods  -  it's not a CRUD
  parseISO8601Duration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (match) {

      const hours = match[1] ? parseInt(match[1], 10) : 0;
      const minutes = match[2] ? parseInt(match[2], 10) : 0;
      const seconds = match[3] ? parseInt(match[3], 10) : 0;
      return hours * 60 + minutes + seconds / 60;
    }
    else {
      return 0;
    }

  }
    async getYouTubeVideoInfo(videoLink: string, apiKey: string): Promise<{ title: string; duration: number; thumbnailUrl : String;}> {
        try {
            const videoId = this.extractVideoId(videoLink);
            if (!videoId)
                throw CustomVideoError.VideoNaoExiste(404,"Video Nao Existe");

            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`);
            const videoInfo = response.data.items[0];
            const title = videoInfo.snippet.title;
            const duration = this.parseISO8601Duration(videoInfo.contentDetails.duration);
            const thumbnailUrl = videoInfo.snippet.thumbnails.default.url; 
            console.log(thumbnailUrl);
            return { title, duration, thumbnailUrl };
        } catch (error) {
            throw error;
        }
    }
  extractVideoId(videoLink: string): string {
    const match = videoLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }
}

