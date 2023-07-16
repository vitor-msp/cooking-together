import { User } from './User'

export type Comment = {
  id?: string
  recipeId?: string
  user?: User
  userId?: string
  text?: string
  createdAt?: string
}
