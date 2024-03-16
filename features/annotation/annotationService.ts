// annotationService.ts

import { Annotation } from "../../core/entities/AnnotationEntitie";
import { AppDataSource } from "../../app";
import { AnnotationNaoExiste } from "./validation/annotationErrors";
import {Video} from "../../core/entities/videoEntitie";
import {User} from "../../core/entities/userEntitie";
import {UsuarioNaoExiste} from "../login/validation/UserErrors";

export default class AnnotationService {
    async postNewNotation(title: string, body: string, videoLink: string, userID: string, ) {
        const id: number = parseInt(userID);
        console.log(id,title, body, videoLink, userID);
        try {
            const user: User | null = await User.findOne({ where: { id: id } });
            if (!user)
                throw new UsuarioNaoExiste(404, "ID não cadastrado no sistema");
            if (videoLink === null)
                throw new UsuarioNaoExiste(404, "Link Invalido");

            const video: Video | null = await Video.findOne({
                where: {
                    user: user,
                    video_link: videoLink
                }
            });
            if (video){
                const annotation: Annotation = new Annotation();
                annotation.tittle = title;
                annotation.body = body;
                annotation.video = video;
                annotation.user = user;
                await AppDataSource.manager.save(annotation);
                return video;
            }

        } catch (error) {
            console.error("Erro ao salvar nova anotação:", error);
            throw new Error("Erro ao salvar nova anotação");
        }
    }
    async getNotation(userID: string, videoLink: string) {
        const userIdNumber: number = parseInt(userID);
        try {
            const user: User | null = await User.findOne({ where: { id: userIdNumber } });
            if (!user) {
                throw new Error("ID não cadastrado no sistema");
            }

            const video: Video | null = await Video.findOne({ where: { video_link: videoLink, user: user } });
            if (!video) {
                throw new Error("Link de vídeo inválido");
            }

            // Busca a anotação usando o usuário e o vídeo
            const annotation: Annotation | null = await Annotation.findOne({
                where: {
                    user: user,
                    video: video
                }
            });
            if (!annotation) {
                throw new Error("Anotação não encontrada");
            }
            return annotation;
        } catch (error) {
            console.error(error);
            throw error; // Ou manuseie o erro conforme necessário
        }
    }
    async getAllNotations(userID: string) {
        const userIdNumber: number = parseInt(userID);
        try {
            const user: User | null = await User.findOne({ where: { id: userIdNumber } });
            if (!user) {
                throw new Error("ID não cadastrado no sistema");
            }
            // Busca a anotação usando o usuário e o vídeo
            const annotation: Annotation[] | null = await Annotation.find({
                where: {user: user,}});
            if (!annotation) {
                throw new Error("Anotação não encontrada");
            }
            return annotation;
        } catch (error) {
            console.error(error);
            throw error; // Ou manuseie o erro conforme necessário
        }
    }
}
