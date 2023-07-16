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

  public async store({ request, response }: HttpContextContract): Promise<{ id: string }> {
    const input: Record<string, string> = request.body()
    const { email, name, password } = input
    const user = await prisma.user.create({ data: { name, email, password } })
    response.status(201)
    return {
      id: user.id,
    }
  }

  public async update({ request, params }: HttpContextContract): Promise<{ id: string }> {
    const id: string = params.id
    const input: Record<string, string> = request.body()
    const user = await prisma.user.findUniqueOrThrow({ where: { id } })
    if (input.name) user.name = input.name
    if (input.email) user.email = input.email
    const { name, email } = user
    await prisma.user.update({ where: { id }, data: { name, email } })
    return {
      id: user.id,
    }
  }

  public async changePassword({ request, params }: HttpContextContract): Promise<{ id: string }> {
    const id: string = params.id
    const input: Record<string, string> = request.body()
    if (!input.oldPassword) throw new Error('missing old password')
    if (!input.newPassword) throw new Error('missing new password')
    const user = await prisma.user.findUniqueOrThrow({ where: { id } })
    if (user.password !== input.oldPassword) throw new Error('incorrect password')
    user.password = input.newPassword
    await prisma.user.update({ where: { id }, data: { password: user.password } })
    return {
      id: user.id,
    }
  }
}
