import {User} from "../../core/entities/userEntitie";
import {AppDataSource} from "../../app";

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
