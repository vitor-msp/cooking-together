import { UserDto } from './User'

export type Comment = {
  id?: string
  recipeId?: string
  user?: UserDto
  userId?: string
  text?: string
  createdAt?: string
}
