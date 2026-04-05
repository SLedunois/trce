import { HttpContext } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'

export default class InvalidPasswordResetTokenException extends Exception {
  static code = 'E_INVALID_PASSWORD_RESET_TOKEN'
  static message = 'This link is invalid or has expired.'

  async handle(error: this, ctx: HttpContext) {
    ctx.session.flash('errorsBag', { [error.code!]: error.message })
    return ctx.response.redirect().toRoute('password.forgot.show')
  }
}
