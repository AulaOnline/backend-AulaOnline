// annotationService.ts
import { Annotation } from "../../core/entities/AnnotationEntitie";
import { AppDataSource } from "../../app";
import {Video} from "../../core/entities/videoEntitie";
import {User} from "../../core/entities/userEntitie";
import {CustomUserError} from "../../features/login/validation/UserErrors";
import {CustomNotationError} from "./validation/annotationErrors";
import {CustomVideoError} from "../video/validation/VideoErrors";

export default class AnnotationService {
    async postNewNotation(title: string, body: string, videoLink: string, userID: string) {
        const id: number = parseInt(userID);
        try {
            const user: User | null = await User.findOne({where: {id: id}});
            if (!user)
                throw CustomUserError.UsuarioNaoExiste(404, "ID não cadastrado no sistema");
            if (videoLink === null)
                throw CustomVideoError.LinkNaoExiste(404, "Esse Video Nao Existe No Hisotrico Do Usuario");

            const video: Video | null = await Video.findOne({
                where: {
                    user: user,
                    video_link: videoLink
                }
            });
            if (!video)
                throw CustomVideoError.VideoNaoExiste(404, "Video Nao Existe No Historico Desse Usuario")

            const annotation: Annotation = new Annotation();
            annotation.tittle = title;
            annotation.body = body;
            annotation.video = video;
            annotation.user = user;
            await AppDataSource.manager.save(annotation);
            return video;
        } catch (error: Error | any){
            throw error;
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

    async deleteAllNotationsOfUser(userID: string) {
        const id: number = parseInt(userID);
        try {
            const user: User | null = await User.findOne({ where: {id: id}})
            if (!user) throw  CustomUserError.UsuarioNaoExiste(404, "Usuario Nao existe Nos Sistema");
            await Annotation.delete({  user: user  });
        } catch (error) {
            throw error;
        }
    }
}
