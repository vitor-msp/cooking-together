import { prisma } from '@ioc:Adonis/Addons/Prisma'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { User } from 'App/models/User'

export default class UsersController {
  public async show({ params }: HttpContextContract): Promise<User> {
    const id: string = params.id
    const user = await prisma.user.findUniqueOrThrow({ where: { id } })
    const { email, name, createdAt } = user
    return {
      id: user.id,
      email,
      name,
      createdAt: createdAt.toISOString(),
    }
  }

  public async store({ request }: HttpContextContract): Promise<{ id: string }> {
    const input: Record<string, string> = request.body()
    const { email, name, password } = input
    const user = await prisma.user.create({ data: { name, email, password } })
    return {
      id: user.id,
    }
  }
}
