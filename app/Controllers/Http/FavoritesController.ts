import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Favorite } from 'App/Models/Favorite'
import { QueryItems } from 'App/utils/QueryItems'

export default class FavoritesController {
  public async store({ request, response }: HttpContextContract): Promise<{ id: string }> {
    const input: Record<string, string> = request.body()
    const { recipeId }: Favorite = input
    const userId = QueryItems.parse(request.parsedUrl.query ?? '')['userId']
    if (!userId) throw new Error('missing user id')
    await prisma.recipe.findUniqueOrThrow({ where: { id: recipeId } })
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        recipeId,
      },
    })
    response.status(201)
    return {
      id: favorite.id,
    }
  }

  public async index({ request }: HttpContextContract): Promise<Favorite[]> {
    const userId = QueryItems.parse(request.parsedUrl.query ?? '')['userId']
    if (!userId) throw new Error('missing user id')
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: {
        id: true,
        recipe: { select: { id: true, servings: true, totalTimeInMinutes: true, updatedAt: true } },
      },
    })
    return favorites.map(({ id, recipe }) => {
      const { servings, totalTimeInMinutes, updatedAt } = recipe
      return {
        id,
        recipe: { id: recipe.id, servings, totalTimeInMinutes, updatedAt: updatedAt.toISOString() },
      }
    })
  }

  public async destroy({ request, params }: HttpContextContract): Promise<{ id: string }> {
    const id: string = params.id
    const userId = QueryItems.parse(request.parsedUrl.query ?? '')['userId']
    if (!userId) throw new Error('missing user id')
    await prisma.favorite.delete({ where: { id, userId } })
    return {
      id,
    }
  }
}
