import HttpException from "./HttpException"

export class TagNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Tag not found with id: ${id}`);
    }
}

export class DuplicateValueTagException extends HttpException {
    constructor(value: string) {
        super(400, `Already have tag with value: ${value}`);
    }
}