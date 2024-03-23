import {CustomUserError} from "../../login/validation/UserErrors";
import {CustomVideoError} from "../../video/validation/VideoErrors";

function isValidYoutubeLink(string: string): boolean {
    return /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/.test(string);
}

export class AIValidation {

    public static async isValidLinkToPrompt(videoLink: string){
        this.isValidLink(videoLink);
    }

    private static isValidLink(link: string): void {
        if (!isValidYoutubeLink(link)){
            throw CustomVideoError.linkInvalido(400, "Link Deve Ser Do Youtube");
        }

    }

}