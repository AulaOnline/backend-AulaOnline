import axios from "axios";
import {YoutubeTranscript} from "youtube-transcript";
import OpenAI from "openai";
import dotenv from 'dotenv';
import {Summary} from "../../core/entities/summaryEntitie";
import {AppDataSource} from "../../app";
import {CustomVideoError} from "../video/validation/VideoErrors";
import {CustomAIErrors} from "./validations/aiErrors";
dotenv.config();
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

const openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const QuestionPrompt = `Read: Thoroughly understand the transcript, noting main ideas, themes, and important details.
Questions: Generate 5 multiple-choice questions in Brazilian Portuguese,questions must to be similar then questions 
on ENEM(EXAME NACIONAL DO ENSINO MEDIO) and related about the video content/theme, questions could never have an image.
Focus: Prioritize creating questions that test on the understanding of the video's main thesis, key arguments, evidence presented, and any critical information that contributes to the comprehension of the subject matter.
Structure for each question:
Response Format: always return JSON parsable object which have exactly this structure:  
{
  'Question 1': {
    statement: 'QUESTION TEXT HERE',
    alternatives: {
      A: 'ALTERNATIVE A',
      B: 'ALTERNATIVE B',
      C: 'ALTERNATIVE C',
      D: 'ALTERNATIVE D',
      E: 'ALTERNATIVE E'
    },
    correctAnswer: 'C'
  },
   'Question 2': {
    statement: 'QUESTION TEXT HERE',
    alternatives: {
      A: 'ALTERNATIVE A',
      B: 'ALTERNATIVE B',
      C: 'ALTERNATIVE C',
      D: 'ALTERNATIVE D',
      E: 'ALTERNATIVE E'
    },
    correctAnswer: 'C'
  },
   'Question 3': {
    statement: 'QUESTION TEXT HERE',
    alternatives: {
      A: 'ALTERNATIVE A',
      B: 'ALTERNATIVE B',
      C: 'ALTERNATIVE C',
      D: 'ALTERNATIVE D',
      E: 'ALTERNATIVE E'
    },
    correctAnswer: 'C'
  },
  'Question 4': {
    statement: 'QUESTION TEXT HERE',
    alternatives: {
      A: 'ALTERNATIVE A',
      B: 'ALTERNATIVE B',
      C: 'ALTERNATIVE C',
      D: 'ALTERNATIVE D',
      E: 'ALTERNATIVE E'
    },
    correctAnswer: 'C'
  },
   'Question 5': {
    statement: 'QUESTION TEXT HERE',
    alternatives: {
      A: 'ALTERNATIVE A',
      B: 'ALTERNATIVE B',
      C: 'ALTERNATIVE C',
      D: 'ALTERNATIVE D',
      E: 'ALTERNATIVE E'
    },
    correctAnswer: 'C'
  }
}

Ensure the questions are diverse, covering different parts and aspects of the video content to provide a comprehensive review through the questionnaire.`;


export default class AiService {
    async getSummary(videoLink: string){
        const alreadyGeneratedSummary = await this.isAlreadyGeneratedSummary(videoLink);
        if (alreadyGeneratedSummary!== undefined)
            return alreadyGeneratedSummary;


        //Summary has been not generated yet
        const videoID = this.extractVideoId(videoLink);
        if (!videoID)
            throw CustomVideoError.VideoNaoExiste(404,"Video Nao Existe");

        if (process.env.TRANSCRIPT_API_KEY === undefined) {throw new Error('THREAD_ID is not defined in the environment variables.');}
        const Transcript = await this.getVideoTranscript(videoID, process.env.TRANSCRIPT_API_KEY);

        if (Transcript.length > 40000)
            throw CustomAIErrors.videoisToBigTogenerate(404, "Video eh Muito Grande Para Gerar Script");

        return await this.generateSummary(Transcript, videoLink);
    }
    async getQuestions(videoLink: string) {
        const videoID = this.extractVideoId(videoLink);
        if (!videoID)
            throw CustomVideoError.VideoNaoExiste(404,"Video Nao Existe");

        if (process.env.TRANSCRIPT_API_KEY === undefined) {throw new Error('THREAD_ID is not defined in the environment variables.');}
        const Transcript = await this.getVideoTranscript(videoID, process.env.TRANSCRIPT_API_KEY);

        if (Transcript.length > 40000)
            throw CustomAIErrors.videoisToBigTogenerate(404, "Video eh Muito Grande Para Gerar Script");

        return await this.generateQuestions(Transcript, videoLink);

    }

    //AUXILIARIES METHODS
    async isAlreadyGeneratedSummary(videoLink: string): Promise<string | undefined> {
        const summary = await Summary.findOne({ where: { video_link: videoLink } });
        if (summary !== undefined) {
            return summary?.summary;
        } else {
            return undefined;}
    }

    async generateSummary(videoTranscript: string, videoLink: string){
        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "Read: Thoroughly understand the transcript, noting main ideas and themes.\n" +
                        "Detailed transcripts: Cover essentials, avoid oversimplification, and priorize a high detailed brief about video, don't let scape informations about the content\n" +
                        "Language: Produce a highly detailed summary but respecting the max_Token parameter, reponses always in brazilian portuguese\n" +
                        "Focus: If content-rich, prioritize the video's thesis and supporting evidence.\n" +
                        "Structure:\n" +
                        "Start: Introduce the main topic briefly.\n" +
                        "Middle: Detail key points clearly.\n" +
                        "End: Conclude with major outcomes or calls to action"},
                {"role": "user", "content": videoTranscript}
            ],
            max_tokens: 1000,
            temperature: 0.5,
            model: "gpt-3.5-turbo-0125",
        });
        let costs  = completion.usage?.total_tokens;
        const summary = completion.choices[0].message.content;
        if (summary!== null)
            await this.postNewGeneratedSummary(videoLink, summary)

        return {
            summary: summary,
            costs: costs
        }
    }
    async generateQuestions(videoTranscript: string, videoLink: string){
        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": QuestionPrompt},
                {"role": "user", "content": videoTranscript}
            ],
            response_format: { "type": "json_object" },
            //max_tokens: 10000,
            temperature: 0.2,
            model: "gpt-3.5-turbo-0125",
        });
        let costs  = completion.usage?.total_tokens;
        let questions = completion.choices[0].message.content;
        let questionsJson: QuestionsObject = {};
        validateQuestionsFormat(questionsJson)
        try {
            if (typeof questions === "string")
                questionsJson = JSON.parse(questions);

        } catch (error: Error | any) {
            throw CustomAIErrors.erroAoGerarQuestoes(404,"Erro Ao Gerar Questoes, Tente Novamente");
        }

        function validateQuestionsFormat(questions: QuestionsObject) {
            for (const key in questions) {
                const question = questions[key];
                if (typeof question.statement !== 'string' ||
                    typeof question.correctAnswer !== 'string' ||
                    typeof question.alternatives !== 'object') {
                    return false;
                }

                // Verifica se todas as alternativas estão presentes
                const alternativesKeys = Object.keys(question.alternatives);
                if (!['A', 'B', 'C', 'D', 'E'].every(letter => alternativesKeys.includes(letter))) {
                    throw CustomAIErrors.erroAoGerarQuestoes(404, "Erro Ao Gerar Questoes, Tente Novamente");
                }

                // Verifica se a resposta correta é uma das alternativas
                if (!alternativesKeys.includes(question.correctAnswer)) {
                    throw CustomAIErrors.erroAoGerarQuestoes(404, "Erro Ao Gerar Questoes, Tente Novamente");
                }
            }
        }
        return {questionsJson}
    }
    async postNewGeneratedSummary(videoLink: string, generatedSummary: string){
        const summary = new Summary();
        summary.video_link = videoLink;
        summary.summary = generatedSummary;
        await AppDataSource.manager.save(summary);
    }


    // === Auxiliares === //
    async getVideoTranscript(videoId: string, apiKey: string): Promise<string> {
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=${apiKey}&part=snippet`);
            const captionInfo = response.data.items[0];
            const captionId = captionInfo.id;
            const transcript = await YoutubeTranscript.fetchTranscript(videoId);
            return transcript.map((entry) => entry.text).join(' ');
        } catch (error) {
           throw CustomAIErrors.erroAoObterInformacoes(404, "Erro Ao Obter Informacoes Sobre O Video");
        }
    }

    extractVideoId(videoLink: string): string {
        const match = videoLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : '';
    }


}

