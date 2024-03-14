import {User} from "../../core/entities/userEntitie";
import {AppDataSource} from "../../app";
import {AtributoInvalido, IDInvalido} from "./validation/UserErrors";
import CustomResponse from "../../core/model/customResponse";

const bcrypt = require('bcrypt');

export default class UserService {
    async getUsers(): Promise<User[]> {
        try {
            return await User.find();
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            throw error;
        }
    }

    async registerUser(newUser: User): Promise<User> {
        try {
            await AppDataSource.manager.save(newUser);
            return newUser;
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw new Error("Erro ao registrar usuário");
        }
    }
    async getUserByID(userID: string): Promise<User> {
        const id: number = parseInt(userID, 10);
        try {
            const user: User | null = await User.findOne({ where: {id: id}})
            if(user)
                return user;
            else
                throw new IDInvalido(404, "ID nao cadastrado no sistema");
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            throw new Error("Erro ao registrar usuário");
        }
    }

    async getUserAttributeByID(userID: string, attribute: string){
        const id: number = parseInt(userID, 10);
        try {
            const user = await User.findOne({where: {id:id}})
            if (!user)
                throw new IDInvalido(404, "ID nao cadastrado no sistema");

            switch (attribute.toLowerCase()){
                case "email":
                    return user.email;
                case "username":
                    return user.username;
                default:
                    throw new AtributoInvalido(404,"Atributo Invalido");
            }
        }catch (error){
            return error;
        }
    }
    async isValidCredentials(user: User): Promise<boolean> {
        try {
            const existingUser: User | null = await User.findOne({where: {username: user.username}});
            if (!existingUser) {
                return false;
            }
            return await bcrypt.compare(user.password, existingUser.password);
        } catch (error) {
            console.error("Erro ao verificar credenciais do usuário:", error);
            throw new Error("Erro ao verificar credenciais do usuário");
        }
    }
}
