import { CreateCommentInterface } from "../types/comment.type"
import { CommentService } from "../services/comment.service"
import { injectable } from "tsyringe"

@injectable()
export class CommentSeeder {
    constructor(private commentService: CommentService) {}
    async createComment(comment: CreateCommentInterface) {
        return await this.commentService.createComment(comment)
    }
}
