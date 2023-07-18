import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export type UserDto = {
  id?: string
  name?: string
  email?: string
  password?: string
  createdAt?: string
}

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public pk: number

  @column()
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
