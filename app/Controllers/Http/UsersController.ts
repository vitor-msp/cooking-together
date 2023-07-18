import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import User, { UserDto } from 'App/Models/User'

export default class UsersController {
  public async show({ params }: HttpContextContract): Promise<UserDto> {
    const id: string = params.id
    const user = await User.query()
      .where('id', id)
      .select(['id', 'email', 'name', 'created_at'])
      .first()
    if (!user) throw new Error('user not found')
    const { email, name, createdAt } = user
    return {
      id: user.id,
      email,
      name,
      createdAt: createdAt.toISO() ?? '',
    }
  }

  public async store({ request, response }: HttpContextContract): Promise<{ id: string }> {
    const input: Record<string, string> = request.body()
    const { email, name, password } = input
    const id: string = uuidv4()
    const user = await User.create({ id, email, name, password })
    response.status(201)
    return {
      id: user.id,
    }
  }

  public async update({ request, params }: HttpContextContract): Promise<{ id: string }> {
    const id: string = params.id
    const input: Record<string, string> = request.body()
    const user = await User.query().where('id', id).select(['pk', 'email', 'name']).first()
    if (!user) throw new Error('user not found')
    if (input.name) user.name = input.name
    if (input.email) user.email = input.email
    await user.save()
    return {
      id,
    }
  }

  public async changePassword({ request, params }: HttpContextContract): Promise<{ id: string }> {
    const id: string = params.id
    const input: Record<string, string> = request.body()
    if (!input.oldPassword) throw new Error('missing old password')
    if (!input.newPassword) throw new Error('missing new password')
    const user = await User.query().where('id', id).select(['pk', 'password']).first()
    if (!user) throw new Error('user not found')
    if (user.password !== input.oldPassword) throw new Error('incorrect password')
    user.password = input.newPassword
    user.save()
    return {
      id,
    }
  }
}
