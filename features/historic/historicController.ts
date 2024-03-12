import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import { Historic } from "../../core/entities/historicEntitie";
const router = express.Router();
import HistoricService from './historicService';
import { Video } from '../../core/entities/videoEntitie';


const NewHistoricService = new HistoricService();


//CREATE
//Cria um novo registro no histórico associado a um vídeo.
//1º dado um link de um video na aplicação (INPUT) vai adciionar esse video na tabela de videos do usuario e no historico
router.post('/postNewVideoInHistoric/:idUser', async (req, res) => {
  try {
    const { video_link } = req.body;
    const userId = req.params.idUser;

    const newVideo: Video = await NewHistoricService.postVideo(video_link);
    const newHistoric :Historic = await NewHistoricService.postHistoricRegister(userId, newVideo);

    return res.status(201).json({
      status: 201,
      message: 'Vídeo adicionado com sucesso',
      newHistoric
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//READ
//Obtém uma lista de TODOS os vídeos no histórico do usuário.
router.get('/getVideosInHistoric/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    const Videos = await NewHistoricService.getVideos(Id);
    return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", Videos));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})


//DELETE
router.delete('/deleteVideoInHistoric/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    const Video: string = req.body.videolink;
    const Deleted = await NewHistoricService.deleteVideo(Id, Video);
    return res.status(204).json(new CustomResponse(204, "Video deletado Com Sucesso", Deleted));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})
//Exclui TODOS vídeos do histórico.
router.delete('/deleteAllVideoInHistoric/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    const Deleted = await NewHistoricService.deleteAllVideos(Id);
    return res.status(204).json(new CustomResponse(204, "Videos deletados Com Sucesso", Deleted));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})



export default router;






