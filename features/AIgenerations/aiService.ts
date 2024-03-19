import axios from "axios";
import {YoutubeTranscript} from "youtube-transcript";
import OpenAI from "openai";
import dotenv from 'dotenv';
import {Summary} from "../../core/entities/summaryEntitie";
import {AppDataSource} from "../../app";
dotenv.config();

const openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default class AiService {
    async getSummary(videoLink: string){
        const alreadyGeneratedSummary = await this.isAlreadyGeneratedSummary(videoLink);
        if (alreadyGeneratedSummary!== undefined){
            console.log("Funcionou");
            return alreadyGeneratedSummary;
        }

        //Summary has been not generated yet
        const videoID = this.extractVideoId(videoLink);
        if (process.env.TRANSCRIPT_API_KEY === undefined) {throw new Error('THREAD_ID is not defined in the environment variables.');}
        const Transcript = await this.getVideoTranscript(videoID, process.env.TRANSCRIPT_API_KEY);
        return await this.generateSummary(Transcript, videoLink);
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
                        "Adjust Length: Match the summary to the transcript's complexity.\n" +
                        "Detailed transcripts: Cover essentials, avoid oversimplification.\n" +
                        "Simpler texts: Be concise, omit extra details, reponses in brazilian portuguese\n" +
                        "Focus: If content-rich, prioritize the video's thesis and supporting evidence.\n" +
                        "Structure:\n" +
                        "Start: Introduce the main topic briefly.\n" +
                        "Middle: Detail key points clearly.\n" +
                        "End: Conclude with major outcomes or calls to action"},
                {"role": "user", "content": videoTranscript}
            ],
            model: "gpt-3.5-turbo-0125",
        });
        let costs  = completion.usage?.total_tokens;
        const summary = completion.choices[0].message.content;
        if (summary!== null)
            await this.postNewGeneratedSummary(videoLink, summary)

        return {
            summary: summary,
            costs: `${costs} tokens`
        }
    }
    async postNewGeneratedSummary(videoLink: string, generatedSummary: string){
        const summary = new Summary();
        summary.video_link = videoLink;
        summary.summary = generatedSummary;
        await AppDataSource.manager.save(summary);
    }
    async getVideoTranscript(videoId: string, apiKey: string): Promise<string> {
        try {
            // Obtém as informações das legendas/captions do vídeo
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=${apiKey}&part=snippet`);
            const captionInfo = response.data.items[0];
            const captionId = captionInfo.id;

            const transcript = await YoutubeTranscript.fetchTranscript(videoId);

            return transcript.map((entry) => entry.text).join(' ');
        } catch (error) {
            console.error('Erro ao obter transcrição do vídeo do YouTube', error);
            throw error;
        }
    }

    extractVideoId(videoLink: string): string {
        const match = videoLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : '';
    }
}

