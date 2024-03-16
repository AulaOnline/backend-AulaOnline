import {Video} from "../../core/entities/videoEntitie";
import {AppDataSource} from "../../app";
import {UsuarioSemHistorico, VideoNaoExiste} from "./validation/VideoErrors";
import axios from 'axios';
import {YoutubeTranscript} from 'youtube-transcript';
import { User } from "../../core/entities/userEntitie";
import { UsuarioNaoExiste } from "../login/validation/UserErrors";

export default class VideoService {
    async postVideo(userId: string, video_link: string): Promise<Video> {
      try {
        const id = parseInt(userId);
        const user = await User.findOne({ where: { id: id } });
        if (!user)
          throw new UsuarioNaoExiste(404, "ID não cadastrado no sistema");

        // Criação do novo vídeo
        const { title, duration } = await this.getYouTubeVideoInfo(video_link, 'AIzaSyAP8NzNyRNglRy0lOJR8thFiRJzCfL6Oe0');
          const newVideo: Video = new Video();
          newVideo.title = title;
          newVideo.total_time = duration;
          newVideo.video_link = video_link;
          newVideo.watched_time = 0;
          newVideo.user = user;
        await AppDataSource.manager.save(newVideo);

        return newVideo;
      } catch (error) {
        console.error("Erro ao registrar vídeo:", error);
        throw error;
      }
    }
  //READ
    async getAllVideosByID(userId: string): Promise<Video[]> {
        const id: number = parseInt(userId);
        const user: User | null = await User.findOne({ where: { id: id } });
        if (!user)
            throw new UsuarioNaoExiste(404, "ID não cadastrado no sistema");

        try {
            const videos :Video[] = await Video.find({ where: { user: user } });
            if (!videos || videos.length === 0)
                throw new UsuarioSemHistorico(404, "Usuário não tem vídeos a serem exibidos");

            return videos;
        } catch (error) {
            console.error("Erro ao buscar vídeos:", error);
            throw error;
        }
    }

    //DELETE
    async deleteAllVideos(userId: string): Promise<void> {
        try {
            const id: number = parseInt(userId);
            const user: User | null = await User.findOne({ where: { id: id } });
            if (!user)
                throw new UsuarioNaoExiste(404, "ID não cadastrado no sistema");

            await Video.delete({ user: user  });

        } catch (error) {
            console.error("Erro ao deletar todos os vídeos:", error);
            throw error;
        }
    }
    async deleteVideo(userId: string, videoLink: string): Promise<void> {
        try {
            const id: number = parseInt(userId);
            const user: User | null = await User.findOne({ where: { id: id } });
            if (!user)
                throw new UsuarioNaoExiste(404, "ID não cadastrado no sistema");

            await Video.delete({ user: user, video_link: videoLink });

        } catch (error) {
            console.error("Erro ao deletar todos os vídeos:", error);
            throw error;
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
    async getYouTubeVideoInfo(videoLink: string, apiKey: string): Promise<{ title: string; duration: number;}> {
        try {
            const videoId = this.extractVideoId(videoLink);

            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`);

            const videoInfo = response.data.items[0];

            const title = videoInfo.snippet.title;
            const duration = this.parseISO8601Duration(videoInfo.contentDetails.duration);
            //const transcript = await this.getVideoTranscript(videoId, apiKey);

            return { title, duration };
        } catch (error) {
            console.error('Erro ao obter informações do vídeo do YouTube', error);
            throw error;
        }
    }
    async getVideoTranscript(videoId: string, apiKey: string): Promise<string> {
        try {
            // Obtém as informações das legendas/captions do vídeo
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=${apiKey}&part=snippet`);
            const captionInfo = response.data.items[0];
            const captionId = captionInfo.id;

            const transcript = await YoutubeTranscript.fetchTranscript(videoId);

            return transcript.map((entry) => entry.text).join(' ');
        } catch (error) {
            console.error('Erro ao obter transcrição do vídeo do YouTube', error);
            throw error;
        }
    }
  extractVideoId(videoLink: string): string {
    const match = videoLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }
}

