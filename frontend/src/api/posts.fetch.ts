import axios from 'axios'
import type { GetPostsResponse } from '@/types/post.type.ts'

export const getPostsFetch = async (): Promise<GetPostsResponse> => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts/`)
  return response.data
}
