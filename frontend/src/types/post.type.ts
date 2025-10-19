export interface PostUser {
  _id: string
  email: string
  firstname: string
  lastname: string
  avatar: string
}

export interface PostApiResponse {
  _id: string
  userId: PostUser
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface GetPostsResponse {
  posts: PostApiResponse[]
}
