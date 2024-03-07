import { Historic } from "../../core/entities/historicEntitie";
import { Video } from "../../core/entities/videoEntitie";
import { AppDataSource } from "../../app";
import { VideoNaoExiste } from "./validation/HistoricErrors";

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

  async postVideo(Id: string, historic: Historic): Promise<Historic> {
    try {
      const id = parseInt(Id);
      historic.user_id = id;

      await AppDataSource.manager.save(historic);
      return historic;
    } catch (error) {
      console.error("Erro ao registrar vídeo:", error);
      throw new Error("Erro ao registrar vídeo");
    }
  }
}
