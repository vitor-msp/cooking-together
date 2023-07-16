import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Comment } from 'App/models/Comment'
import { QueryItems } from 'App/utils/QueryItems'

type CommentQuery = {
  recipeId: string
}

export default class CommentsController {
  public async index({ request }: HttpContextContract): Promise<Comment[]> {
    const queryItems: CommentQuery = QueryItems.parse(request.parsedUrl.query ?? '')
    const { recipeId } = queryItems
    if (!recipeId || recipeId.length === 0) throw new Error('missing recipeId')
    const recipe = await prisma.comment.findMany({
      where: { recipeId },
      select: { text: true, createdAt: true, user: { select: { id: true, name: true } } },
    })
    return recipe.map(({ text, createdAt, user }) => {
      return {
        text,
        createdAt: createdAt.toISOString(),
        user,
      }
    })
  }

  public async store({ request, response }: HttpContextContract): Promise<{ id: string }> {
    const input: Record<string, string> = request.body()
    const { recipeId, userId, text }: Comment = input
    const comment = await prisma.comment.create({ data: { recipeId, userId, text } })
    response.status(201)
    return {
      id: comment.id,
    }
  }

  public async destroy({ params }: HttpContextContract): Promise<{ id: string }> {
    const id: string = params.id
    await prisma.comment.delete({ where: { id } })
    return {
      id,
    }
  }
}
