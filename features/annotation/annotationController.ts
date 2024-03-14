// annotationController.ts

import express from 'express';
import AnnotationService from './annotationService';
import { AnnotationNaoExiste } from './validation/annotationErrors';

const router = express.Router();
const annotationService = new AnnotationService();

router.post('/postNewNotation/:userId', async (req, res) => {
    try {
        const {videoId, title, body } = req.body;
        const newAnnotation = await annotationService.postNewNotation(videoId, title, body);
        return res.status(201).json(newAnnotation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/getNotationAboutVideo/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const annotations = await annotationService.getNotationAboutVideo(videoId);
        return res.status(200).json(annotations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.put('/updateAtributoNotation/:notationId/:atributo', async (req, res) => {
    try {
        const { notationId, atributo } = req.params;
        const { valor } = req.body;
        const updatedAnnotation = await annotationService.updateAtributoNotation(notationId, atributo, valor);
        return res.status(200).json(updatedAnnotation);
    } catch (error) {
        if (error instanceof AnnotationNaoExiste) {
            return res.status(error.type).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.delete('/deleteNotationAboutVideo/:notationId', async (req, res) => {
    try {
        const { notationId } = req.params;
        await annotationService.deleteNotationAboutVideo(notationId);
        return res.status(204).json({ message: 'Anotação excluída com sucesso' });
    } catch (error) {
        if (error instanceof AnnotationNaoExiste) {
            return res.status(error.type).json({ error: error.message });
        }
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;
