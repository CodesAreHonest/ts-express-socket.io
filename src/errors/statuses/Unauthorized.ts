import { ErrorMessage } from "../../common/types";

class Unauthorized extends Error {
    private statusCode: number = 401;

    constructor(
        private errorCode: string,
        private errorDescription: string,
        private errorMessage: ErrorMessage,
    ) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Unauthorized);
        }

        this.statusCode = this.statusCode;
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.errorMessage = errorMessage;
    }
}

export default Unauthorized;