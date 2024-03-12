import { Historic } from "../../core/entities/historicEntitie";
import { Video } from "../../core/entities/videoEntitie";
import { AppDataSource } from "../../app";
import { VideoNaoExiste } from "./validation/HistoricErrors";
import axios from 'axios';

export default class HistoricService {
  async getAtributoVideo(Id: string, Atributo: string): Promise<any> {
   
  }

  /*async updateVideo(Id: string, Atributo: string, novoValor: any): Promise<Video> {
    
}*/

async deleteVideo(historicId: string, videoId: string): Promise<void> {
    
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

  async deleteAllVideos(Id: string): Promise<void> {
    try {
      const id = parseInt(Id);
      await Historic.delete({ user_id: id });
    } catch (error) {
      console.error("Erro ao deletar todos os vídeos:", error);
      throw error;
    }
  }

  async getVideos(Id: string): Promise<Historic[]> {
    const id = parseInt(Id);

    try {
      const videos = await Historic.find({ where: { user_id: id }, relations: ['video'] });
      return videos;
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
      throw error;
    }
  }

  async postVideoinHistoric(Id: string, video: Video): Promise<Historic> {
    try {
      const id = parseInt(Id);
      const videoId = video.video_id;

      await AppDataSource.manager.save(video);
      const historic = new Historic();
      historic.video = video;
      historic.user_id = id;

      //historic.annotation = ...
      //historic.watched_time = ...
      await AppDataSource.manager.save(historic);
      return historic;
    } catch (error) {
      console.error("Erro ao registrar vídeo:", error);
      throw new Error("Erro ao registrar vídeo");
    }
  }

  async getYouTubeVideoInfo(videoLink: string, apiKey: string): Promise<{ title: string; duration: number; transcript: string }> {
  try {
    const videoId = this.extractVideoId(videoLink);

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`);

    const videoInfo = response.data.items[0];

    const title = videoInfo.snippet.title;
    const duration = this.parseISO8601Duration(videoInfo.contentDetails.duration);
    const transcript = "testee";
    //await this.getVideoTranscript(videoId, apiKey);
    console.log(title);
    console.log(duration);
    console.log(transcript);
    
    return { title, duration, transcript };
  } catch (error) {
    console.error('Erro ao obter informações do vídeo do YouTube', error);
    throw error;
  }
}
  async getVideoTranscript(videoId: string, apiKey: string) : Promise<string> {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=${apiKey}&part=snippet`);

      const captionInfo = response.data.items[0];
      const captionId = captionInfo.id;

      const transcriptResponse = await axios.get(`https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${apiKey}&format=txt`);

      return transcriptResponse.data;
    } catch (error) {
      console.error('Erro ao obter transcrição do vídeo do YouTube', error);
      throw error;
    }
  }

extractVideoId(videoLink: string): string {
  const match = videoLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : '';
}

parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if(match){

  const hours = match[1] ? parseInt(match[1], 10) : 0;
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const seconds = match[3] ? parseInt(match[3], 10) : 0;
  return hours * 60 + minutes + seconds / 60;
  }

  else{
    return 0;
  }

}

}
