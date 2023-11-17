export default class ApiError extends Error {
    public status: number;
    public anyMessage: any;
    constructor(message?: any, status: number = 500) {
        super(message);
        this.anyMessage = message;
        this.status = status;
    }
}
