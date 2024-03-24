import {CustomVideoError} from "./VideoErrors";
import {CustomUserError} from  "../../login/validation/UserErrors"

// === REGEX === //
function isValidYoutubeLink(string: string): boolean {
    return /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/.test(string);
}
function isOnlyNumbers(string: string): boolean {
    return /^\d+$/.test(string);
}

export class VideoValidations {
    public static async isValidID(id: string): Promise<void> {
        this.isOnlyNumbers(id);
        this.isNegative(id);
    }
    public static async isValidVideo(id: string, videoLink: string): Promise<void> {
        this.isOnlyNumbers(id);
        this.isNegative(id);
        this.isValidLink(videoLink);
    }
    public static async isValidVideoInfos(title: string, duration: number): Promise<void> {
       this.validTitle(title)
       this.isValidDuration(duration);
    }
    private static isOnlyNumbers(id: string): void {
        if (!isOnlyNumbers(id))
            throw CustomUserError.IDInvalido(400, "ID do usuário não pode ser não numérico");
    }
    private static isValidLink(link: string): void {
        if (!isValidYoutubeLink(link))
            throw CustomVideoError.linkInvalido(400, "Link deve ser do youtube");
    }
    private static isNegative(id: string): void {
        const NumberID = parseInt(id)
        if (NumberID <= 0)
            throw CustomUserError.IDInvalido(400, "ID do usuário não pode ser negativo");
    }

    private static validTitle(title: string) {
        if (title.length <= 0)
            throw CustomVideoError.VideoNaoExiste(404, "Vídeo não existe");
    }
    private static isValidDuration(duration: number) {
        if (duration > 100)
            throw CustomVideoError.DuracaoVideoInvalida(400,"Duração do vídeo não é válida");
    }
}

