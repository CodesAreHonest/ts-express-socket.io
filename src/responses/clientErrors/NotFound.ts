import { ErrorMessage } from "../../common/types";

class NotFound extends Error {
    public readonly statusCode: number = 404;

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

export default NotFound;