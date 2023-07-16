import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Recipe } from 'App/models/Recipe'

export default class RecipesController {
  public async show({ params }: HttpContextContract): Promise<Recipe> {
    const id: string = params.id
    const recipe = await prisma.recipe.findUniqueOrThrow({
      where: { id },
      include: { User: { select: { id: true, name: true } } },
    })
    return {
      title: recipe.title,
      description: recipe.description,
      servings: recipe.servings,
      totalTimeInMinutes: recipe.totalTimeInMinutes,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      createdAt: recipe.createdAt.toISOString(),
      updatedAt: recipe.updatedAt.toISOString(),
      user: {
        id: recipe.User.id,
        name: recipe.User.name,
      },
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<{ id: string }> {
    const input: Record<string, string> = request.body()
    const { title, userId, ingredients, directions }: Recipe = input
    const recipe = await prisma.recipe.create({
      data: {
        title,
        description: input.description,
        servings: +input.servings,
        totalTimeInMinutes: +input.totalTimeInMinutes,
        ingredients,
        directions,
        userId,
      },
    })
    response.status(201)
    return {
      id: recipe.id,
    }
  }

  //   public async update({ request, params }: HttpContextContract): Promise<{ id: string }> {
  //     const id: string = params.id
  //     const input: Record<string, string> = request.body()
  //     const recipe = await prisma.recipe.findUniqueOrThrow({ where: { id } })
  //     if (input.name) recipe.name = input.name
  //     if (input.email) recipe.email = input.email
  //     const { name, email } = recipe
  //     await prisma.recipe.update({ where: { id }, data: { name, email } })
  //     return {
  //       id: recipe.id,
  //     }
  //   }
}
