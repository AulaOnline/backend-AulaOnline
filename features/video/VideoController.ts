import express from 'express';
import CustomResponse from "../../core/model/customResponse";
const router = express.Router();
import { Video } from '../../core/entities/videoEntitie';
import VideoService from "./VideoService";


const videoService = new VideoService();

//CREATE
router.post('/postNewVideo/:idUser', async (req, res) => {
  try {
    const userId = req.params.idUser;
    const { video_link } = req.body;

    const newVideo: Video = await videoService.postVideo(userId, video_link);

    return res.status(201).json({
      status: 201,
      message: 'Vídeo adicionado com sucesso',
      newVideo
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//READ
router.get('/getVideosOfUser/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    const Videos: Video[] = await videoService.getAllVideosByID(Id);
    return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", Videos));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

//DELETE
router.delete('/deleteAllVideoInHistoric/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    const Deleted = await videoService.deleteAllVideos(Id);
    return res.status(204).json(new CustomResponse(204, "Videos deletados Com Sucesso", Deleted));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})
router.delete('/deleteOneVideoInHistoric/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    const { video_link } = req.body;
    const Deleted = await videoService.deleteVideo(Id, video_link);
    return res.status(204).json(new CustomResponse(204, "Videos deletados Com Sucesso", Deleted));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

export default router;






