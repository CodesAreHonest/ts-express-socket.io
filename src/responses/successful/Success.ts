import { SuccessType } from "../../common/types";
import { ISuccessResponse } from '../../common/interfaces/responses';

class Success {
    private _statusCode: number = 200;
    private _message: string = "success";
    private _data: SuccessType;

    constructor(data: SuccessType = null) {
        this._data = data;
    }

    get toJson(): ISuccessResponse {

        const response: ISuccessResponse = {
            status: this._statusCode,
            message: this._message
        };

        if (this._data === null) {
            return response;
        }

        return {
            status: this._statusCode,
            message: this._message,
            data: this._data
        }
    }
}

export default Success;