import { IsArray, IsDefined, IsInt, IsString, IsUrl, Matches } from "class-validator"

export class CreateTagDto {
    @IsString()
    public value: string;
    @IsString()
    public desc: string;
    @IsDefined()
    @Matches(/^#+[a-f0-9]{6}$/)
    public color: string;
    @IsUrl()
    public image: string;
    @IsInt()
    public post: number;
    @IsArray()
    public moderator: string[]
    constructor(value: string, desc: string, color: string, image: string, post?: number, moderator?: string[]) {
        this.value = value;
        this.desc = desc;
        this.color = color;
        this.image = image;
        this.post = post == null ? 0 : post;
        this.moderator = moderator == null ? [] : moderator;
    }
}