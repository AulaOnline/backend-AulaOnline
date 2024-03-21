export class CustomUserError extends Error {
    public type: number;

    constructor(type: number, message: string) {
        super(message);
        this.type = type;
    }

    static UsernameInvalido(type: number, message: string): CustomUserError {
        return new CustomUserError(type, message);
    }

    static SenhaInvalida(type: number, message: string): CustomUserError {
        return new CustomUserError(type, message);
    }

    static AtributoInvalido(type: number, message: string): CustomUserError {
        return new CustomUserError(type, message);
    }

    static IDInvalido(type: number, message: string): CustomUserError {
        return new CustomUserError(type, message);
    }

    static UsuarioJaExistente(type: number, message: string): CustomUserError {
        return new CustomUserError(type, message);
    }

    static UsuarioNaoExiste(type: number, message: string): CustomUserError {
        return new CustomUserError(type, message);
    }
    static EmailInvalido(type: number, message: string): CustomUserError {
        return new CustomUserError(type, message);
    }
    static ErroDeEscrita(type: number, message: string): CustomUserError {
        return new CustomUserError(type, message);
    }
}
