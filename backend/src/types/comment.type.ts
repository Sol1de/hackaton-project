export interface CommentInterface {
    _id?: string;
    userId: string;
    postId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}