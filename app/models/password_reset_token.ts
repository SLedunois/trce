import { DateTime } from 'luxon'

import { PasswordResetTokenSchema } from '#database/schema'

export default class PasswordResetToken extends PasswordResetTokenSchema {
  get isExpired(): boolean {
    return this.expiresAt < DateTime.now()
  }
}
