import App from "./app"
import TagController from "./tag/tag.controller";
import validateEnv from "./utils/validateEnv";

validateEnv();

const app = new App([
    new TagController(),
], 3000);

app.listen();