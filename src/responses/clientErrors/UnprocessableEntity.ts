import { ErrorMessage } from "../../common/types";

class UnprocessableEntity extends Error {
    private statusCode: number = 422;

    constructor(
        private errorCode: string,
        private errorDescription: string,
        private errorMessage: ErrorMessage,
    ) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnprocessableEntity);
        }

        this.statusCode = this.statusCode;
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.errorMessage = errorMessage;
    }
}

export default UnprocessableEntity;