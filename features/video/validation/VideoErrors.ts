export class CustomVideoError extends Error {
    public type: number;
    constructor(type: number, message: string) {
        super(message);
        this.type = type;
    }

    static VideoNaoExiste(type: number,message: string) {
        return new CustomVideoError(type, message);
    }

    static LinkNaoExiste(type: number, message: string) {
        return new CustomVideoError(type, message);
    }

    static DuracaoVideoInvalida(type: number, message: string) {
        return new CustomVideoError(type, message);
    }

    static UsuarioSemHistorico(type: number, message: string) {
        return new CustomVideoError(type, message);
    }
    static linkInvalido(type: number, message: string) {
        return new CustomVideoError(type, message);
    }

    static ErroDeRegistro(type: number, message: string) {
        return new CustomVideoError(type, message);
    }
}
