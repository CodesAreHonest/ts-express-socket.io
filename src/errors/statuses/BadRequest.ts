import { ErrorMessage } from "../../common/types";

class BadRequest extends Error {
    private statusCode: number = 400;

    constructor(
        private errorCode: string,
        private errorDescription: string,
        private errorMessage: ErrorMessage,
    ) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequest);
        }

        this.statusCode = this.statusCode;
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.errorMessage = errorMessage;
    }
}

export default BadRequest;