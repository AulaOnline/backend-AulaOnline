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
                await AppDataSource.manager.save(annotation);
                return video;
            }

        } catch (error) {
            console.error("Erro ao salvar nova anotação:", error);
            throw new Error("Erro ao salvar nova anotação");
        }
    }
}
