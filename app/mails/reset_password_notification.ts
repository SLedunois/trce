import { signedUrlFor } from '@adonisjs/core/services/url_builder'
import { BaseMail } from '@adonisjs/mail'

import { appUrl } from '#config/app'

import User from '#models/user'

export default class ResetPasswordNotification extends BaseMail {
  subject = 'Reset your password'

  constructor(
    private user: User,
    private token: string
  ) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    const resetUrl = signedUrlFor(
      'password.reset.show',
      { token: this.token },

      {
        expiresIn: '1 hour',
        prefixUrl: appUrl,
      }
    )
    this.message.to(this.user.email).htmlView('emails/password_reset', { resetUrl })
  }
}
