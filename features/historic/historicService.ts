import {Historic} from "../../core/entities/historicEntitie";
import {AppDataSource} from "../../app";
import CustomResponse from "../../core/model/customResponse";



//Criação de várias funções async utéis para as rotas, usando as funções do TypeORM como find, select, save...
export default class HistoricService {
    async getVideos() {
        try {
            return await Historic.find();
        } catch (error) {
            console.error("Erro ao buscar videos:", error);
            throw error;
        }
    }


}