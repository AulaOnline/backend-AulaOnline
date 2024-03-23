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
        const questions: QuestionsObject  = await aiService.getQuestions(videoLink);
        //console.log(questions['Question 1']);
        res.status(200).json( new CustomResponse(201, "Chamada Feita", questions));

    } catch (error: Error | any){
        res.status(error.type).json( new CustomResponse(error.type,error.message,null));
    }
})

export default router;
