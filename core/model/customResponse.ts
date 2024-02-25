export default class CustomResponse {
    public statusCode: number;
    public message: string;
    public data: object | string | null;

    constructor(statusCode: number, message: string, data: object | string | null) {
            this.statusCode = statusCode;
            this.message = message;
            this.data = data;
    }
}
