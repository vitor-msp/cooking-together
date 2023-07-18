import { User } from './User.old'

export type Comment = {
  id?: string
  recipeId?: string
  user?: User
  userId?: string
  text?: string
  createdAt?: string
}
