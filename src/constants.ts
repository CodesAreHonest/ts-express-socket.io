export enum SocketEvent {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    MESSAGE = 'message',
    SCAN_VOUCHER_SUCCESS = 'scan_voucher_success',
    INBOX_NOTIFICATION = 'inbox_notification',
    INBOX_ANNOUNCEMENT = 'inbox_announcement'
};

export enum SocketStatus {
    NEW_INBOX = 'NEW_INBOX',
    NEW_ANNOUNCEMENT = 'NEW_ANNOUNCEMENT'
}

export enum Platform {
    SAMPLE_PLATFORM = 'SAMPLE_PLATFORM'
}

export enum StatusCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHENTICATED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502
};

export enum ErrorDescription {
    INVALID_INPUT = "Input provided is not valid.",
    INVALID_PAYLOAD = "Payload provided does not satisfy our request body requirements.",
    MAINTENANCE = 'server module under maintenance',
    FORBIDDEN = 'user does not have the permission to access or create resource',
    QUERY_EXCEPTION = 'malformed query founds in database operations.',
    UNEXPECTED_ERROR = 'an unexpected events occurs on database transactions or server operations. ',
    UNHANDLED_EXCEPTION = 'errors generate from operations without exception handling.',
    CLIENT_EXCEPTION = 'client made an invalid request.',
    SERVER_EXCEPTION = 'server failed to fulfill a request. ',
    UNAUTHORIZED = 'you have no permission access to the resources',
    UNAUTHENTICATED = 'unable to authenticated with the provided credentials',
    API_KEY_INVALID = 'API Key invalid',
    NOT_FOUND = 'Record not found',
    BAD_GATEWAY = 'unknown error occurs'
}

export enum ErrorCode {
    INVALID_INPUT = "INVALID_INPUT",
    INVALID_PAYLOAD = "INVALID_PAYLOAD",
    MAINTENANCE = 'MAINTENANCE',
    FORBIDDEN = 'FORBIDDEN',
    QUERY_EXCEPTION = 'QUERY_EXCEPTION',
    UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
    UNHANDLED_EXCEPTION = 'UNHANDLED_EXCEPTION',
    CLIENT_EXCEPTION = 'CLIENT_EXCEPTION',
    SERVER_EXCEPTION = 'SERVER_EXCEPTION',
    UNAUTHORIZED = 'UNAUTHORIZED',
    UNAUTHENTICATED = 'UNAUTHENTICATED',
    API_KEY_INVALID = 'API_KEY_INVALID',
    NOT_FOUND = 'NOT_FOUND',
    BAD_GATEWAY = 'BAD_GATEWAY'
}

export enum VerifyTokenStatus {
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    ACCESS_TOKEN_NOTFOUND = 'ACCESS_TOKEN_NOTFOUND',
    SIGNATURE_VERIFICATION_FAILURE = 'SIGNATURE_VERIFICATION_FAILURE',
    SUCCESS = 'SUCCESS'
}; 