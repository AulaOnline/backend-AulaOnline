import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import {Historic} from "../../core/entities/historicEntitie";
const router = express.Router();
import HistoricService from './historicService';


const NewHistoricService = new HistoricService();

//Cria um novo registro no histórico associado a um vídeo.
router.post('/postNewVideoInHistoric/:idUser', async (req, res) => {
   try {
    const { watched_time, video_link, annotation } = req.body;
    const Id:string = req.params.idUser;
    const historic = new Historic();
    historic.watched_time = watched_time;
    historic.video= video_link;
    historic.annotation = annotation;
    
    const NewHistoric = await NewHistoricService.postVideo(Id,historic);

    return res.status(201).json(new CustomResponse(201, "Vídeo adicionado com sucesso", NewHistoric));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Obtém uma lista de TODOS os vídeos no histórico do usuário.
router.get('/getVideosInHistoric/:idUser', async (req, res) => {
   try {
    const Id:string = req.params.idUser;
    const Videos = await NewHistoricService.getVideos(Id);
    return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", Videos));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})


//Exclui TODOS vídeos do histórico.
router.delete('/deleteVideoInHistoric/:idUser', async (req, res) => {
    try {
    const Id:string = req.params.idUser;
    const Deleted = await NewHistoricService.deleteAllVideos(Id);
    return res.status(204).json(new CustomResponse(204, "Videos deletados Com Sucesso",Deleted));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Obtém um vídeo específico apartir do id do próprio
router.get('/getVideoByTittle/:idUser/:video', async (req, res) => {
   try {
    const VideoTittle: string = req.params.video;
    const IdUser: string =req.params.idUser;
    const Video = await NewHistoricService.getVideoByTittle(IdUser,VideoTittle);
   return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", Video));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Exclui um vídeo especifico a partir do ID do próprio 
router.delete('/deleteVideoInHistoric/:idUser/:videolink', async (req, res) => {
    try {
    const Id:string = req.params.idUser;
    const Video:string = req.params.videolink;
    const Deleted = await NewHistoricService.deleteVideo(Id,Video);
    return res.status(204).json(new CustomResponse(204, "Video deletado Com Sucesso", Deleted));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Atualiza um atributo de um Video especifico
router.put('/updateAtributoVideo/:idVideo/:atributo/:valor', async (req, res) => {
    try {
    const Id:string = req.params.idVideo;
    const Atributo:string = req.params.atributo;
    const NewValor = req.params.valor;
    //const Update = await NewHistoricService.updateVideo(Id,Atributo,NewValor);
    //return res.status(204).json(new CustomResponse(204, "Video atualizado Com Sucesso",Update));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Obtém um atributo de um vídeo específico a partir do ID do próprio 
router.get('getAtributoVideoInHistoric/:idVideo/:atributo', async (req, res) => {
   try {
    const Id = req.params.idVideo;
    const Atributo = req.params.atributo;
    const AtributoVideo = await NewHistoricService.getAtributoVideo(Id,Atributo);
    return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", AtributoVideo));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})



export default router;


