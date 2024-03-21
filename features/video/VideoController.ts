import express from 'express';
import CustomResponse from "../../core/model/customResponse";
const router = express.Router();
import { Video } from '../../core/entities/videoEntitie';
import VideoService from "./VideoService";
import {VideoValidations} from "./validation/VideoValidations";
import {CustomUserError} from "../login/validation/UserErrors";
import {CustomVideoError} from "./validation/VideoErrors";


const videoService = new VideoService();

router.post('/postNewVideo/:idUser', async (req, res) => {
  try {
    const userId = req.params.idUser;
    const { video_link } = req.body;
    await VideoValidations.isValidVideo(userId,video_link);
    const newRegisteredVideo = await videoService.postVideo(userId, video_link);
    return res.status(201).json({
      status: 200,
      message: 'Vídeo adicionado com sucesso',
      newRegisteredVideo
    });
  } catch (error: Error | any) {
      return res.status(error.type).json(new CustomResponse(error.type, error.message, error));
  }
})

router.get('/getVideosOfUser/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    await VideoValidations.isValidID(Id);
    const Videos: Video[] = await videoService.getAllVideosByID(Id);
    return res.status(200).json(new CustomResponse(200, "Busca Feita Com Sucesso", Videos));
  } catch (error: Error | any) {
    return res.status(error.type).json(new CustomResponse(error.type, error.message, error));
  }
})

router.delete('/deleteAllVideoInHistoric/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    await VideoValidations.isValidID(Id);
    const Deleted = await videoService.deleteAllVideos(Id);
    return res.status(204).json(new CustomResponse(204, "Videos deletados Com Sucesso", Deleted));
  } catch (error: Error | any) {
    return res.status(error.type).json(new CustomResponse(error.type, error.message, error));
  }
})
router.delete('/deleteOneVideoInHistoric/:idUser', async (req, res) => {
  try {
    const Id: string = req.params.idUser;
    const { video_link } = req.body;
    await VideoValidations.isValidVideo(Id, video_link);
    const Deleted = await videoService.deleteVideo(Id, video_link);
    return res.status(204).json(new CustomResponse(204, "Videos deletados Com Sucesso", Deleted));
  } catch (error: Error | any) {
    return res.status(error.type).json(new CustomResponse(error.type, error.message, error));
  }
})

export default router;






