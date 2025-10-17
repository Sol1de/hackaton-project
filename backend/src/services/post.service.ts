import { Post } from "../models/posts.model"
import { PostInterface, CreatePostInterface, UpdatePostInterface, DeletePostInterface } from "../types/post.type"
import { PostError } from "../errors/post.error"
import { UtilsService } from "./utils.service";
import { injectable } from "tsyringe";

@injectable()
export class PostService {
    constructor(
        private utilsService: UtilsService,
    ) {}

    async getPosts(){
        return Post.find().sort({createdAt: -1}).populate('userId', 'firstname lastname email avatar')
    }

    async getPost(postId: string){
        this.utilsService.validateObjectId(postId)
        const post = await Post.findOne({ _id: postId }).populate('userId', 'firstname lastname email avatar')

        if (!post) {
            throw PostError.postNotFound(postId)
        }

        return post
    }

    async createPost(postData: CreatePostInterface){
        if (!postData.content || !postData.title) {
            throw PostError.invalidPostData({ 
                content: !postData.content ? "Content is required" : undefined,
                title: !postData.title ? "Title is required" : undefined
            })
        }

        const post: PostInterface = {
            content: postData.content,
            userId: postData.userId,
            title: postData.title
        }

        try {
            return await Post.create(post)
        } catch (error) {
            throw PostError.createPostFailed()
        }
    }

    async updatePost(postData: UpdatePostInterface){
        this.utilsService.validateObjectId(postData._id)

        if (!postData.content && !postData.title) {
            throw PostError.invalidPostData({
                message: "At least one field must be provided"
            })
        }

        const post = await Post.findById(postData._id)

        if (!post) {
            throw PostError.postNotFound(postData._id)
        }

        if (post.userId.toString() !== postData.userId.toString()) {
            throw PostError.unauthorizedPostAccess()
        }

        const updateData: Partial<PostInterface> = {
            content: postData.content,
            title: postData.title
        }

        return Post.findByIdAndUpdate(postData._id, updateData, {new: true})
    }

    async deletePost(postData: DeletePostInterface){
        this.utilsService.validateObjectId(postData._id)

        const post = await Post.findById(postData._id)

        if (!post) {
            throw PostError.postNotFound(postData._id)
        }

        if (post.userId.toString() !== postData.userId.toString()) {
            throw PostError.unauthorizedPostAccess()
        }

        return Post.findByIdAndDelete(postData._id)
    }
}