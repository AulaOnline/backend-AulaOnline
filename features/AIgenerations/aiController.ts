import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import AiService from "./aiService";
const router = express.Router();


router.get('/generateSummary', async (req, res) => {
    const aiService = new  AiService();
    const { videoLink } = req.body;
    const summary = await aiService.getQuestions(videoLink);
    res.status(200).json( new CustomResponse(201, "Chamada Feita", summary));
})

export default router;
