import { str, cleanEnv, port } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),
        MONGO_HOST: str(),
        MONGO_PORT: port(),
        MONGO_DB: str(),
        MONDO_ADMIN_DATABASE: str()
    })
}export default validateEnv;