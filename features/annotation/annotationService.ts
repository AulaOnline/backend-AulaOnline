// annotationService.ts

import { Annotation } from "../../core/entities/annotationEntitie";
import { AppDataSource } from "../../app";
import { AnnotationNaoExiste } from "./validation/annotationErrors";

export default class AnnotationService {
    async postNewNotation(videoId: string, title: string, body: string) {
        try {
            const annotation = new Annotation();
            
            annotation.annotation_id = videoId;
            annotation.tittle = title;
            annotation.body = body;
            
            await AppDataSource.manager.save(annotation);
            
            return annotation;
        } catch (error) {
            console.error("Erro ao salvar nova anotação:", error);
            throw new Error("Erro ao salvar nova anotação");
        }
    }

    async getNotationAboutVideo(videoId: string) {
        try {
            const annotations = await Annotation.find({ where: { annotation_id: videoId } });
            return annotations;
        } catch (error) {
            console.error("Erro ao obter anotações sobre o vídeo:", error);
            throw error;
        }
    }

   
    async updateAtributoNotation(notationId: string, atributo: string, valor: string) {
        try {
            const annotation = await Annotation.findOne({ where: { annotation_id: notationId } });
            if (!annotation) {
                throw new AnnotationNaoExiste(404, "Anotação não encontrada.");
            }
    
            if (atributo === "title") {
                annotation.tittle = valor;
            } else if (atributo === "body") {
                annotation.body = valor;
            } else {
                throw new Error("Atributo inválido.");
            }
    
            await AppDataSource.manager.save(annotation);
            
            return annotation;
        } catch (error) {
            console.error("Erro ao atualizar atributo da anotação:", error);
            throw error;
        }
    }
    

    async deleteNotationAboutVideo(notationId: string) {
        try {
            const annotation = await Annotation.findOne({ where: { annotation_id: notationId } });
            if (!annotation) {
                throw new AnnotationNaoExiste(404, "Anotação não encontrada.");
            }
    
            await AppDataSource.manager.remove(annotation);
        } catch (error) {
            console.error("Erro ao excluir anotação:", error);
            throw error;
        }
    }    
}
