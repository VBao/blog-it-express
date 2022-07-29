import mongoose, {
    Document,
    Schema,
    model,
    createConnection,
    ObjectId,
} from "mongoose";
import Tag from "./tag.interface";


// Create schema from interface
export const schema = new Schema<Tag>(
    {
        value: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        color: {
            type: String,
            default: "#" + Math.floor(Math.random() * 16777215).toString(16), // Random hex color
        },
        image: { type: String, required: true },
        post: { type: Number, required: true, default: 0 },
        moderator: { type: [String], required: false },
        created_at: { type: Date, default: new Date() },
    },
    {
        collection: "tag", //  Khai báo tên của collection đã được lưu trên database
    }
);

const tagModel = mongoose.model<Tag>("tag", schema);
export default tagModel;
