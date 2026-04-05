import { DateTime } from 'luxon'

import type { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import mail from '@adonisjs/mail/services/main'
import hash from '@adonisjs/core/services/hash'

import User from '#models/user'
import { forgotValidator, resetValidator } from '#validators/password'
import PasswordResetToken from '#models/password_reset_token'
import ResetPasswordNotification from '#mails/reset_password_notification'
import InvalidPasswordResetTokenException from '#exceptions/invalid_password_reset_token_exception'

export default class PasswordResetsController {
  async showForgotPassword({ inertia }: HttpContext) {
    return inertia.render('auth/forgot_password', {})
  }

  async processForgotPassword({ request, response, session }: HttpContext) {
    const { email } = await request.validateUsing(forgotValidator)
    const user = await User.findBy('email', email)

    if (user) {
      await PasswordResetToken.query().where('user_id', user.id).delete()
      const token = string.generateRandom(64)

      await PasswordResetToken.create({
        token,
        userId: user.id,
        expiresAt: DateTime.now().plus({ hours: 1 }),
      })

      await mail.send(new ResetPasswordNotification(user, token))
    }

    session.flash('success', 'If this email exists, a reset link has been sent.')
    return response.redirect().toRoute('login.show')
  }

  async showResetPassword(ctx: HttpContext) {
    const { params, inertia } = ctx
    const token = await PasswordResetToken.findBy('token', params.token)

    if (!token || token.isExpired) {
      throw new InvalidPasswordResetTokenException()
    }

    return inertia.render('auth/password_change', { token: token.token })
  }

  async resetPassword({ request, response, session }: HttpContext) {
    const { token, password } = await request.validateUsing(resetValidator)

    const record = await PasswordResetToken.query().where('token', token).firstOrFail()

    if (record.isExpired) {
      throw new InvalidPasswordResetTokenException()
    }

    const user = await User.findByOrFail('id', record.userId)
    user.password = password
    await user.save()

    await record.delete()

    session.flash('success', 'Password updated! You can now log in.')
    return response.redirect().toRoute('login.show')
  }
}
