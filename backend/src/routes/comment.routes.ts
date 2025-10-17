import { Router } from "express";
import { container } from "tsyringe";
import { CommentController } from "../controllers/comment.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const commentController = container.resolve(CommentController);
const authMiddleware = container.resolve(AuthMiddleware);

export const commentRouter = Router();

commentRouter.get("/", commentController.getComments.bind(commentController));

commentRouter.get("/:commentId", commentController.getComment.bind(commentController));

commentRouter.post("/",
    authMiddleware.authenticate.bind(authMiddleware),
    commentController.createComment.bind(commentController)
)

commentRouter.put('/:commentId', 
    authMiddleware.authenticate.bind(authMiddleware),
    commentController.updateComment.bind(commentController)
)

commentRouter.delete('/:commentId',
    authMiddleware.authenticate.bind(authMiddleware),
    commentController.deleteComment.bind(commentController)
)