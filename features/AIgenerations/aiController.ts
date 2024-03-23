import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import AiService from "./aiService";
import {AIValidation} from "./validations/AIValidation";
import {FineTuningJob} from "openai/resources/fine-tuning";
import Error = FineTuningJob.Error;
const router = express.Router();

const aiService = new  AiService();
router.get('/generateSummary', async (req, res) => {
    const { videoLink } = req.body;
    try {
        await AIValidation.isValidLinkToPrompt(videoLink);
        const summary = await aiService.getSummary(videoLink);
        res.status(200).json( new CustomResponse(201, "Chamada Feita", summary));
    } catch (error: Error | any){
        res.status(error.type).json( new CustomResponse(error.type,error.message,null));
    }
})
router.get('/generateQuestion', async (req, res) => {
    const { videoLink } = req.body;
    try {
        await AIValidation.isValidLinkToPrompt(videoLink);
        const summary = await aiService.getQuestions(videoLink);
        res.status(200).json( new CustomResponse(201, "Chamada Feita", summary));
    } catch (error: Error | any){
        res.status(error.type).json( new CustomResponse(error.type,error.message,null));
    }
})

export default router;
