export type errorMessageType = object | string | null | string[];
export type successDataType = object | [] | null;

export interface IErrorFormat {
    msg: string,
    param: string
};

export interface ICustomErrorResponse {
    _errorMessage: errorMessageType,
    _errorCode: string,
    _errorDescription: string,
    _statusCode: number
};

export interface ISuccessResponse {
    status: number,
    message: string,
    data?: successDataType
};

export interface IErrorResponse {
    errorCode: string,
    errorDescription: string,
    errorMessage: errorMessageType
}