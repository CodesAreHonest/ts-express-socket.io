import { ErrorMessage } from "../../common/types";

class InternalServerError extends Error {
    private statusCode: number = 500;

    constructor(
        private errorCode: string,
        private errorDescription: string,
        private errorMessage: ErrorMessage,
    ) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InternalServerError);
        }

        this.statusCode = this.statusCode;
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.errorMessage = errorMessage;
    }
}

export default InternalServerError;