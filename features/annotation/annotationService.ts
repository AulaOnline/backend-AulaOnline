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
            if (!user)
                throw CustomUserError.UsuarioNaoExiste(404, "ID não cadastrado no sistema");


            const video: Video | null = await Video.findOne({ where: { video_link: videoLink, user: user } });
            if (!video)
                throw CustomVideoError.VideoNaoExiste(404,"Esse Video Nao Consta No Historico Do Usuario");


            const annotation: Annotation | null = await Annotation.findOne({
                where: {
                    user: user,
                    video: video
                }
            });
            if (!annotation)
                throw CustomNotationError.videoSemAnotacaoVinculada(404, "O usuario Nao tem nenhuma anotacao vinculada a esse video.");

            return annotation;
        }  catch (error: Error | any){
            throw error;
        }
    }
    async getAllNotations(userID: string) {
        const userIdNumber: number = parseInt(userID);
        try {
            const user: User | null = await User.findOne({ where: { id: userIdNumber } });

            if (!user)
                throw CustomUserError.UsuarioNaoExiste(404, "ID não cadastrado no sistema");

            const annotation: Annotation[] | null = await Annotation.find({
                where: {user: user,}});

            if (annotation.length === 0) {
                throw  CustomNotationError.anotacaoNaoExiste(404,"Nenhuma Anotacao encontrada");
            }
            return annotation;
        }  catch (error: Error | any){
            throw error;
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
