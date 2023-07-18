import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { v4 as uuidv4 } from 'uuid'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response }: HttpContextContract): Promise<{ id: string }> {
    const input: Record<string, string> = request.body()
    const { email, name, password } = input
    const id: string = uuidv4()
    const hashedPassword = await Hash.make(password)
    const user = await User.create({ idmain: id, email, name, password: hashedPassword })
    response.status(201)
    return {
      id: user.idmain,
    }
  }

  public async login({ request, auth }: HttpContextContract): Promise<any> {
    const { email, password } = request.body()
    const token = await auth.use('api').attempt(email, password)
    return token
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
  }
}
