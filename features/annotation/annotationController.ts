// annotationController.ts
import express from 'express';
import AnnotationService from './annotationService';
import CustomResponse from "../../core/model/customResponse";
import {Annotation} from "../../core/entities/AnnotationEntitie";
import {AnnotationValidation} from "./validation/annotationValidation";

const router = express.Router();
const annotationService = new AnnotationService();


//CREATE
router.post('/postNewNotation/:userId', async (req, res) => {
    const {title, body, videoLink } = req.body;
    const userID: string = req.params.userId
    try {
        await AnnotationValidation.isValidNote(userID, title, body, videoLink);
        const postedNotation = await annotationService.postNewNotation(title, body, videoLink, userID);
        return res.status(201).json(new CustomResponse(201, "Anotacao Cadastrada Com Sucesso", postedNotation));
    } catch (error: Error | any) {
        return res.status(error.type).json( new  CustomResponse(error.type, error.message, error));
    }
});

//READ
router.get('/getAllNotations/:userId', async (req, res) => {
    try {
        const userID: string = req.params.userId
        const Allanotations: Annotation[] = await annotationService.getAllNotations(userID);
        return res.status(201).json(new CustomResponse(201, "Anotacao Cadastrada Com Sucesso", Allanotations));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get('/getNotation/:userId', async (req, res) => {
    try {
        const {videoLink} = req.body;
        const userID: string = req.params.userId
        const notation: Annotation= await annotationService.getNotation(userID, videoLink);
        return res.status(201).json(new CustomResponse(201, "Anotacao Cadastrada Com Sucesso", notation));
    } catch (error) {
        return res.status(500).json(new CustomResponse(404, "Bad Request", error));
    }
});

//Delete
router.delete('/deleteAllNotationOfUser/:userId', async (req, res) => {
    try {
        const userID: string = req.params.userId
        await annotationService.deleteAllNotationsOfUser(userID);
        return res.status(201).json(new CustomResponse(201, "Anotacao Delet Com Sucesso", null));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


export default router;
