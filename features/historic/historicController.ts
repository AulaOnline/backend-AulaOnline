import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import {Historic} from "../../core/entities/historicEntitie";
import { createTokens, isTokenValid } from '../../core/infra/JWT';
const router = express.Router();
import HistoricService from './historicService';


//Cria um novo registro no histórico associado a um vídeo.
router.post('/postNewVideoInHistoric', async (req, res) => {
   try {
    const { watched_time, video_link, annotation } = req.body;

    const historic = new Historic();
    historic.watched_time = watched_time;
    historic.video= video_link;
    historic.annotation = annotation;

    await historic.save();

    return res.status(201).json(historic);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Obtém uma lista de todos os vídeos no histórico.
router.get('/getVideoInHistoric', async (req, res) => {
    
   try {
    const NewHistoricService = new HistoricService();
    const historics = await NewHistoricService.getVideos();
    return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", historics));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Exclui vídeos do histórico.
/*router.delete('/deleteVideoInHistoric', async (req, res) => {
    
    try {
    //await getRepository(Historic).clear();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})*/







