interface Tag {
    value: string;
    desc: string;
    color?: string;
    image: string;
    post: number;
    moderator?: string[];
    created_at?: Date;
}
export default Tag;