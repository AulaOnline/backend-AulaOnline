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
const FAKE_OBJECT: QuestionsObject = {
    "Question 1": {
        "statement": "De acordo com o vídeo, quais são os três elementos básicos que todos os climas possuem?",
        "alternatives": {
            "A": "Temperatura, Precipitação e Altitude",
            "B": "Umidade, Pressão Atmosférica e Latitude",
            "C": "Temperatura, Umidade e Pressão Atmosférica",
            "D": "Albedo, Umidade Relativa e Altitude",
            "E": "Precipitação, Albedo e Umidade Relativa"
        },
        "correctAnswer": "C"
    },
    "Question 2": {
        "statement": "O que é a umidade relativa do ar, de acordo com o vídeo?",
        "alternatives": {
            "A": "Quantidade de vapor d'água presente na atmosfera",
            "B": "Quantidade de chuva esperada para o dia",
            "C": "Percentual de saturação da atmosfera",
            "D": "Medida em gramas por metro cúbico",
            "E": "Total de unidades de vapor na superfície"
        },
        "correctAnswer": "C"
    },
    "Question 3": {
        "statement": "Qual a recomendação da Organização Mundial da Saúde para a umidade relativa do ar em relação à saúde humana?",
        "alternatives": {
            "A": "Entre 10% e 30%",
            "B": "Entre 30% e 50%",
            "C": "Entre 40% e 70%",
            "D": "Entre 70% e 90%",
            "E": "Acima de 90%"
        },
        "correctAnswer": "C"
    },
    "Question 4": {
        "statement": "Como a pressão atmosférica varia de acordo com a altitude, conforme explicado no vídeo?",
        "alternatives": {
            "A": "A pressão atmosférica aumenta com a altitude",
            "B": "A pressão atmosférica diminui com a altitude",
            "C": "A pressão atmosférica é constante em qualquer altitude",
            "D": "A pressão atmosférica é maior ao nível do mar",
            "E": "A pressão atmosférica é maior em altitudes elevadas"
        },
        "correctAnswer": "B"
    },
    "Question 5": {
        "statement": "Qual a relação entre a cor de uma superfície e a quantidade de calor que ela reflete, de acordo com o vídeo?",
        "alternatives": {
            "A": "Cores claras refletem mais calor do que cores escuras",
            "B": "Cores escuras refletem mais calor do que cores claras",
            "C": "Cores claras absorvem mais calor do que cores escuras",
            "D": "Cores escuras absorvem mais calor do que cores claras",
            "E": "A cor da superfície não influencia na absorção de calor"
        },
        "correctAnswer": "A"
    }
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
        const questions: QuestionsObject = await aiService.getQuestions(videoLink);
        res.status(200).json(new CustomResponse(201, "Chamada Feita", questions));
    } catch (error: Error | any) {
        res.status(error.type || 500).json(new CustomResponse(error.type || 500, error.message, null));
    }
});
export default router;
