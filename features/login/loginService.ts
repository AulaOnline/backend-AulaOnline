import {User} from "../../core/entities/userEntitie";
import {AppDataSource} from "../../app";


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

}
