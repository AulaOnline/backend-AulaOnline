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
        await AnnotationValidation.isValidID(userID);
        const Allanotations: Annotation[] = await annotationService.getAllNotations(userID);
        return res.status(201).json(new CustomResponse(201, "Anotacao Recuperada Com Sucesso", Allanotations));
    }catch (error: Error | any) {
        return res.status(error.type).json(new CustomResponse(error.type, error.message, error));
    }
});

router.post('/getNotation/:userId', async (req, res) => {
    try {
        const {videoLink} = req.body;
        const userID: string = req.params.userId
        await AnnotationValidation.isValidIDandLink(userID, videoLink);
        const notation: Annotation= await annotationService.getNotation(userID, videoLink);
        return res.status(201).json(new CustomResponse(201, "Anotacao Cadastrada Com Sucesso", notation));
    } catch (error: Error | any) {
        return res.status(error.type).json(new CustomResponse(error.type, error.message, error));
    }
});

//Delete
router.delete('/deleteAllNotationOfUser/:userId', async (req, res) => {
    try {
        const userID: string = req.params.userId
        await AnnotationValidation.isValidID(userID);
        await annotationService.deleteAllNotationsOfUser(userID);
        return res.status(201).json(new CustomResponse(201, "Anotacao Delet Com Sucesso", null));
    } catch (error: Error | any) {
        return res.status(error.type).json(new CustomResponse(error.type, error.message, error));
    }
});


export default router;
