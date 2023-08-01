import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract): Promise<any> {
    const { email, password } = request.body()
    const token = await auth.use('api').attempt(email, password)
    return {
      userId: token.user.idmain,
      token: token.token,
      type: token.type,
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke()
  }
}
