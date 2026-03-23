import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ForcePasswordChangeMiddleware {
  async handle({ auth, request, response }: HttpContext, next: NextFn) {
    const user = auth.user

    if (!user) return next()

    const isOnChangePasswordRoute = request.url().startsWith('/password/change')

    if (user.mustChangePassword() && !isOnChangePasswordRoute) {
      return response.redirect('/password/change')
    }

    return next()
  }
}
