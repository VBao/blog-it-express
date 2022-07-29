import { Request, Response, NextFunction } from "express";
import HttpException from "../exception/HttpException";

function errorMiddleware(exception: HttpException, req: Request, res: Response, next: NextFunction) {
    const status = exception.status || 500;
    const message = exception.message || "Not check exception here";
    res.status(status).send({ message, status });
} export default errorMiddleware;