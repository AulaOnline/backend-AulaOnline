import express from 'express';
import CustomResponse from "../../core/model/customResponse";
import AiService from "./aiService";
import {AIValidation} from "./validations/AIValidation";
import {FineTuningJob} from "openai/resources/fine-tuning";
import Error = FineTuningJob.Error;
const router = express.Router();

const aiService = new  AiService();
interface QuestionAlternative {
    A: string;
    B: string;
    C: string;
    D: string;
    E: string;
}

interface Question {
    statement: string;
    alternatives: QuestionAlternative;
    correctAnswer: string;
}

interface QuestionsObject {
    [key: string]: Question;
}


router.post('/generateSummary', async (req, res) => {
    const { videoLink } = req.body;
    try {
        await AIValidation.isValidLinkToPrompt(videoLink);
        const summary = await aiService.getSummary(videoLink);
        res.status(200).json(new CustomResponse(201, "Chamada Feita", summary));
    } catch (error: Error | any) {
        const statusCode = error.type === 'CustomAIErrors' ? 404 : 500;
        res.status(statusCode).json(new CustomResponse(statusCode, error.message, null));
    }
})

router.post('/generateQuestion', async (req, res) => {
    const { videoLink } = req.body;
    try {
        await AIValidation.isValidLinkToPrompt(videoLink);
        const questions: QuestionsObject  = await aiService.getQuestions(videoLink);
        res.status(200).json( new CustomResponse(201, "Chamada Feita", questions));

    } catch (error: Error | any){
        res.status(error.type).json( new CustomResponse(error.type,error.message,null));
    }
})

export default router;
