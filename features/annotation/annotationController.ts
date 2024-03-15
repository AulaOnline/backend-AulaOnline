// annotationController.ts

import express from 'express';
import AnnotationService from './annotationService';
import { AnnotationNaoExiste } from './validation/annotationErrors';
import CustomResponse from "../../core/model/customResponse";

const router = express.Router();
const annotationService = new AnnotationService();

router.post('/postNewNotation/:userId', async (req, res) => {
    try {
        const {title, body, videoLink } = req.body;
        const userID: string = req.params.userId
        const postedNotation= annotationService.postNewNotation(title, body, videoLink, userID);
        return res.status(201).json(new CustomResponse(201, "Anotacao Cadastrada Com Sucesso", postedNotation));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});




export default router;
