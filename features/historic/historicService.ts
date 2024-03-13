import {Historic} from "../../core/entities/historicEntitie";
import {Video} from "../../core/entities/videoEntitie";
import {AppDataSource} from "../../app";
import {VideoNaoExiste} from "./validation/HistoricErrors";
import axios from 'axios';
import {YoutubeTranscript} from 'youtube-transcript';

export default class HistoricService {

  async postVideo(video_link: string): Promise <Video> {
    try {
      const { title, duration} = await this.getYouTubeVideoInfo(video_link, 'AIzaSyAP8NzNyRNglRy0lOJR8thFiRJzCfL6Oe0');
      const video: Video = new Video();
      video.tittle = title;
      video.total_time = duration;
      video.video_link = video_link;
      return await AppDataSource.manager.save(video);
    } catch (e){
      throw new VideoNaoExiste(400, 'erro ao salvar o video no banco de dados');
    }
  }

  //CREATE
  async postHistoricRegister(UserId: string, video: Video): Promise<Historic> {
    try {
      const id = parseInt(UserId);
      const historic = new Historic();
      historic.video = video;
      historic.user_id = id;

      await AppDataSource.manager.save(historic);
      return historic;
    } catch (error) {
      console.error("Erro ao registrar vídeo:", error);
      throw new Error("Erro ao registrar vídeo");
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

  //READ
  async getVideos(Id: string): Promise<Historic[]> {
    const id = parseInt(Id);
    try {
      return await Historic.find({where: {user_id: id}, relations: ['video']});
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
      throw error;
    }
  }




  //DELETE
  async deleteAllVideos(Id: string): Promise<void> {
    try {
      const id = parseInt(Id);
      await Historic.delete({ user_id: id });
    } catch (error) {
      console.error("Erro ao deletar todos os vídeos:", error);
      throw error;
    }
  }
  async getVideoByTittle(IdUser: string, VideoTittle: string): Promise<Historic | undefined> {
    try {
      const id = parseInt(IdUser);
      const video = await Historic.findOne({ where: { user_id: id, video: { tittle: VideoTittle } }, relations: ['video'] });

      if (video) {
        return video;
      } else {
        throw new VideoNaoExiste(404, "Video não encontrado no histórico do usuário.");
      }
    } catch (error) {
      console.error("Erro ao buscar vídeo pelo título:", error);
      throw error;
    }
  }


  async updateVideo(Id: string, Atributo: string, NewValor: string) {
    throw new Error('Method not implemented.');
  }
  async getAtributoVideo(Id: string, Atributo: string): Promise<any> {

  }

  async deleteVideo(historicId: string, videoId: string): Promise<void> {

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

  extractVideoId(videoLink: string): string {
    const match = videoLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : '';
  }


}
