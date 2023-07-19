import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ModifyQuery {
  protected redirectTo = '/login'

  protected async setUserIdInQuery(
    auth: HttpContextContract['auth'],
    request: HttpContextContract['request']
  ) {
    const userId = auth.use('api').user!.idmain
    const oldQuery = request.parsedUrl.query
    const newQuery = `userId=${userId}`.concat(oldQuery ? `&${oldQuery}` : '')
    request.parsedUrl.query = newQuery
  }

  public async handle({ auth, request }: HttpContextContract, next: () => Promise<void>) {
    await this.setUserIdInQuery(auth, request)
    await next()
  }
}
