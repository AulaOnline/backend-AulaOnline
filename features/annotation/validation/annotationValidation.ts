import {CustomVideoError} from "../../video/validation/VideoErrors";
import {CustomUserError} from "../../login/validation/UserErrors";
import {CustomNotationError} from "./annotationErrors";

// === REGEX === //
function isOnlyNumbers(string: string): boolean {
    return /^\d+$/.test(string);
}
function isValidYoutubeLink(string: string): boolean {
    return /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/.test(string);
}

export class AnnotationValidation {
    public static async isValidNote(userID: string, title: string, body: string, videoLink: string):Promise<void> {
        this.isOnlyNumbers(userID);
        this.isNegative(userID);
        this.isNotEmptyString(title,'titulo');
        this.isNotEmptyString(body, 'corpo');
        this.isValidSize(title, 'titulo');
        this.isValidSize(body, 'corpo');
        this.isValidLink(videoLink);
    }

    private static isOnlyNumbers(id: string): void {
        if (!isOnlyNumbers(id))
            throw CustomUserError.IDInvalido(400, "ID do Usuario Nao Pode Ser nao Numerico");
    }
    private static isNegative(id: string): void {
        const NumberID = parseInt(id)
        if (NumberID <= 0)
            throw CustomUserError.IDInvalido(400, "ID do Usuario Nao Pode Ser Negativo");
    }
    private static isValidLink(link: string): void {
        if (!isValidYoutubeLink(link))
            throw CustomVideoError.linkInvalido(400, "Link Deve Ser Do Youtube");
    }

    private static isNotEmptyString(campo: string, nomeDoCampo: string) {
        if (campo.length <= 0)
            throw CustomNotationError.campoVazio(400, `O ${nomeDoCampo} Nao Pode Ser Vazio`)

        if (isOnlyNumbers(campo))
            throw CustomNotationError.campoNaoPodeSerSomenteNumerico(400, `${nomeDoCampo} Nao Pode Ser Apenas Numerico`)
    }
    private static isValidSize(campo: string, nomeDoCampo: string) {
        if (campo.length > 1000)
            throw CustomNotationError.campoMuitoGrande(400, `O ${nomeDoCampo} Excedeu o limite de Caracteres`)

        if (nomeDoCampo.toLowerCase() === 'titulo' && campo.length > 35)
            throw CustomNotationError.campoMuitoGrande(400, `O ${nomeDoCampo} Eh Muito Grande`)
    }
}