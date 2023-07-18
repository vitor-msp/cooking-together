import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthUsersController {
  public async login({ request, auth }: HttpContextContract): Promise<{ token: string }> {
    const { email, password } = request.body()
    const user = await User.query()
      .where('email', email)
      .where('password', password)
      .select(['id', 'idmain', 'email'])
      .first()
    if (!user) throw new Error('user not found')
    const token = await auth.login(user)
    return { token }
  }
}
