import {CustomUserError} from "./UserErrors";

// === REGEX === //
function isValidCharacters(string: string): boolean {
    //devolve falso se a string nao tiver pelo menos uma letras ou no maximo numeros, nenhum outro caractere eh valido
    return /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/.test(string)
}
function isValidPassword(string: string): boolean {
    return /\d/.test(string);
}

function isValidEmail(string: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(string);
}
function isOnlyNumbers(string: string): boolean {
    return /^\d+$/.test(string);
}

export class UserValidations {
    public static async isValidUser(email: string, username: string, password: string): Promise<void> {
        this.validateEmail(email);
        this.validateUsername(username);
        this.validatePassword(password);
    }
    public static async isValidID(id: string): Promise<void> {
        this.isOnlyNumbers(id);
        this.isNegative(id);
    }
    public static async isValidAtributte(id: string, attribute: string): Promise<void> {
        this.isOnlyNumbers(id);
        this.isNegative(id);
        this.isAttribute(attribute);
    }
    public static async isValidUsername(username: string): Promise<void> {
        this.validateUsername(username);
    }
    public static async isValidCredentials(username: string, password: string): Promise<void> {
        this.validateUsername(username);
        this.validatePassword(password);
    }

    private static validateUsername(username: string): void {
        if (username.length < 3 || username.length > 20 || !isValidCharacters(username)) {
            throw CustomUserError.UsuarioJaExistente(400, "Nome do usuário inválido");
        }
        if (!isValidCharacters(username)) {
            throw CustomUserError.UsernameInvalido(400, "Formato do nome do usuário inválido");
        }
    }

    private static validatePassword(password: string): void {
        console.log(password.length);
        if (password.length <= 3 || password.length > 20)
            throw CustomUserError.SenhaInvalida(400, "Tamanho da senha invalido");

        if (!isValidPassword(password))
            throw CustomUserError.SenhaInvalida(400, "A senha deve ter pelo menos um número");
    }

    private static validateEmail(email: string): void {
        if (email.length < 2 || !isValidEmail(email) || email.length > 40) {
            throw CustomUserError.EmailInvalido(400, "Email do Usuario é inválido");
        }
    }

    private static isOnlyNumbers(id: string): void {
        if (!isOnlyNumbers(id))
            throw CustomUserError.IDInvalido(400, "ID do Usuário não pode ser não numérico");
    }
    private static isNegative(id: string): void {
        const NumberID = parseInt(id)
        if (NumberID <= 0)
            throw CustomUserError.IDInvalido(400, "ID do usuário não pode ser negativo");
    }

    private static isAttribute(attribute: string) {
        switch (attribute.toLowerCase()){
            case "email":
                return;
            case "username":
                return;
            default:
                throw CustomUserError.AtributoInvalido(404,"Atributo inválido");
        }
    }
}

