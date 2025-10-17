import {PostInterface} from "../types/post.type"
import {PostService} from "../services/post.service"
import {injectable} from "tsyringe"

@injectable()
export class PostSeeder {
    constructor(private postService: PostService) {}
    async createPost(post: PostInterface) {
        return await this.postService.createPost(post)
    }
}