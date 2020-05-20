import { ErrorMessage } from "../../common/types";

class Forbidden extends Error {
    public readonly statusCode: number = 403;

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

export default Forbidden;