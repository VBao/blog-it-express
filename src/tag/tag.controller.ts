import { NextFunction, Request, Response, Router } from "express";
import { CallbackError } from "mongoose";
import Controller from "../controllers/controller";
import { ResponseDto } from "../dto/response.dto";
import HttpException from "../exception/HttpException";
import * as TagException from "../exception/TagException";
import validationMiddleware from "../middleware/validation.middleware";
import { CreateTagDto } from "./dto/tag.dto";
import Tag from "./tag.interface";
import tagModel from "./tag.model";
const tag = require('./tag.model');

class TagController implements Controller {
    public path = '/tag';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(`${this.path}`, this.find)
        this.router.post(`${this.path}`, validationMiddleware(CreateTagDto), this.create)
        this.router.patch(`${this.path}`, validationMiddleware(CreateTagDto, true), this.update)
        this.router.delete(`${this.path}`, this.delete)
    }

    demo = async (req: Request, res: Response) => {

    }

    getAll = async (req: Request, res: Response) => {
        let data = await tagModel.find({}).exec();
        res.json(data);
    }

    find = async (req: Request, res: Response, next: NextFunction) => {
        if (req.query.id != null) {
            await tagModel.findById(req.query.id).then(data => {
                if (data != null) {
                    return res.json(new ResponseDto('sucess', 200, data));
                } else {
                    next(new TagException.TagNotFoundException(req.query.id as string));
                }
            })
        } else {
            return res.json(new ResponseDto('sucess', 200, await tagModel.find({}).exec()));
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        let data: CreateTagDto = req.body;
        let collection: Tag[] = await tagModel.find({ value: data.value }).exec();
        if (collection.length == 0) {
            await tagModel.create(data).then((result) => {
                res.json(new ResponseDto('success', 202, result));
            });
        } else {
            next(new TagException.DuplicateValueTagException(data.value));
        }
        // await tagModel.find({ value: data.value }, async (error: CallbackError, collection: Tag[]) => {
        //     if (collection.length == 0) {
        //         await tagModel.create(data).then((result) => {
        //             return res.json(new ResponseDto('success', 202, result));
        //         });
        //     } else {
        //         next(new TagException.DuplicateValueTagException(data.value));
        //     }
        // })
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        let error: string = '';
        let tagId = req.query.id;
        if (tagId != null) {
            let updateTag: Tag = req.body;
            if (updateTag == null) error.concat('must have id in query field to update, ');

            if (await tagModel.findById(tagId) == null) error.concat('must have id in query field to update, ');

            if (updateTag.value != null) {
                if (await tagModel.findOne({ value: updateTag.value }).exec() != null) error.concat('must have id in query field to update, ');
            }

            if (error.length == 0) { res.json(new ResponseDto('updated', 200, await tagModel.findOneAndUpdate({ _id: tagId }, updateTag, { new: true }))); } else {
                next(new HttpException(400, error));
            }
        } else {
            error.concat('must have id in query field to update, ');
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        if (req.query.id != null) {
            if (await tagModel.findById(req.query.id) != null) {
                await tagModel.deleteOne({ _id: req.query.id }).exec();
                res.json(new ResponseDto('success', 200))
            } else {
                next(new TagException.TagNotFoundException(req.query.id as string));
            }
        } else {
            next(new HttpException(400, 'not found id in query param'));
        }
    }
}

export default TagController;