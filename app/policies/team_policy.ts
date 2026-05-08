import type User from '#models/user'
// import Team from '#models/team'
import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TeamPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  edit(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  delete(user: User): AuthorizerResponse {
    return user.isAdmin
  }
}
