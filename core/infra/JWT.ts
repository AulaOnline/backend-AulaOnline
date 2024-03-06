//Fazer a logica de cookies posteriormente

import {sign, verify} from 'jsonwebtoken';
import {User} from "../entities/userEntitie";

export const createTokens = (user: User) => {
    const accessToken = sign( {username: user.username, id: user.id}, "senha", { expiresIn: '60m' });
    return accessToken;

};

export const isTokenValid = (token:any) => {
    try {
        const decoded = verify(token, "senha");
        return { valid: true, decoded };
    } catch (error) {
        return { valid: false };
    }
};