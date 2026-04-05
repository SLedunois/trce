import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

import { hasOne } from '@adonisjs/lucid/orm'
import PasswordResetToken from '#models/password_reset_token'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @hasOne(() => PasswordResetToken)
  declare user: HasOne<typeof PasswordResetToken>

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }

  mustChangePassword(): boolean {
    return this.temporaryPassword
  }

  static ROLES = {
    USER: 'user',
    ADMIN: 'admin',
  }
}
