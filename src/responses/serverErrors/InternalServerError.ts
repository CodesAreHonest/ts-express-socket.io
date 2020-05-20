import { ErrorMessage } from "../../common/types";

class InternalServerError extends Error {
    public readonly statusCode: number = 500;

    constructor(
        public errorCode: string,
        public errorDescription: string,
        public errorMessage: ErrorMessage,
    ) {
        super();

        this.statusCode = this.statusCode;
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.errorMessage = errorMessage;
    }
}

export default InternalServerError;