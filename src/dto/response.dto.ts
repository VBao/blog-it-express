export interface IResponseDto {
    message: string,
    statusCode: number,
    data?: any
}

export class ResponseDto implements IResponseDto {
    message: string;
    statusCode: number;
    data: any;

    constructor(message?: string, statusCode?: number, data?: any) {
        this.message = message != null ? message : 'not set message error';
        this.statusCode = statusCode != null ? statusCode : 500;
        if (data != null) this.data = data;
    }

    public set setMessage(message: string) {
        this.message = message;
    }

    public set setStatus(statusCode: number) {
        this.statusCode = statusCode;
    }

    modelFormatError(error: NativeError): IResponseDto {
        this.message = error.message;
        this.statusCode = 400;
        return this;
    }
}

