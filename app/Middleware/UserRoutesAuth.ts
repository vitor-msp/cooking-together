import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomAuthMiddleware {
  protected redirectTo = '/login'

  protected async checkTokenAndParam(
    auth: HttpContextContract['auth'],
    params: HttpContextContract['params']
  ) {
    const idIsEqual = auth.use('api').user!.idmain.localeCompare(params.id) === 0
    if (!idIsEqual) throw new Error('bad token/parameter')
  }

  public async handle({ auth, params }: HttpContextContract, next: () => Promise<void>) {
    await this.checkTokenAndParam(auth, params)
    await next()
  }
}
