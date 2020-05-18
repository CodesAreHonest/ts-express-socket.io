import { ErrorMessage } from "../../common/types";

class NotFound extends Error {
    private statusCode: number = 404;

    constructor(
        private errorCode: string,
        private errorDescription: string,
        private errorMessage: ErrorMessage,
    ) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFound);
        }

        this.statusCode = this.statusCode;
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
        this.errorMessage = errorMessage;
    }
}

export default NotFound;