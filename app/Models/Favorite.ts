import { Recipe } from './Recipe'

export type Favorite = {
  id?: string
  recipe?: Recipe
  recipeId?: string
  userId?: string
}
