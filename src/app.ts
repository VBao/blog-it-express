import express, { Application, Router } from "express";
import Controller from "./controllers/controller";
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import 'dotenv/config';
import errorMiddleware from "./middleware/error.middleware";

class App {
    public app: express.Application;
    public port: number;
    constructor(controllers: Controller[], port: number) {
        this.app = express();
        this.port = port;

        // Initialize middleware go from top to end so it must have similar order 
        this.initializeDatabase();                  // Database connection first
        this.initializeMiddleWares();               // Check request data and authen second
        this.initializeControllers(controllers);    // Then to controller
        this.initializeErrorHandling();             // If got error will return error middleware to response out
    }

    private initializeDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_HOST,
            MONGO_PORT,
            MONGO_DB,
            MONDO_ADMIN_DATABASE
        } = process.env;
        // console.log(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONDO_ADMIN_DATABASE}`)
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=${MONDO_ADMIN_DATABASE}`);
    }

    initializeMiddleWares() {
        this.app.use(bodyParser.json());
    }

    initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening at port ${this.port}`);

        });
    }
}
export default App;