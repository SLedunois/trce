import crypto from 'crypto'

import { BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import hash from '@adonisjs/core/services/hash'
import db from '@adonisjs/lucid/services/db'

export default class GenerateAdmin extends BaseCommand {
  static commandName = 'generate:admin'
  static description = 'Generate an administrator user with a temporary password'

  static options: CommandOptions = {
    startApp: true,
  }

  @flags.string()
  declare email: string

  @flags.string()
  declare firstname: string

  @flags.string()
  declare lastname: string

  /**
   * Throw a missing parameter exeption and print command usage
   * @param parameter missing parameter name
   */
  private throwMissingErrorParameter(parameter: string) {
    throw new Error(`Missing parameter: ${parameter}
      usage: node ace generate:admin --email=<email> --firstname=<firstname> --lastname=<lastname>`)
  }

  /**
   * Generate a secure random password
   * @param length password length
   * @returns secure random password
   */
  private generateRandomSecuredPassword(length = 24): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    const specialCaraters = '!@#$%^&*()_+'

    const all = lowercase + uppercase + numbers + specialCaraters

    let password = ''

    password += lowercase[crypto.randomInt(lowercase.length)]
    password += uppercase[crypto.randomInt(uppercase.length)]
    password += numbers[crypto.randomInt(numbers.length)]
    password += specialCaraters[crypto.randomInt(specialCaraters.length)]

    for (let i = password.length; i < length; i++) {
      password += all[crypto.randomInt(all.length)]
    }

    return password
      .split('')
      .sort(() => crypto.randomInt(2) - 1)
      .join('')
  }

  async run() {
    const flags: string[] = ['email', 'firstname', 'lastname']

    flags.forEach((flag: string) => {
      if (!(this as any)[flag]) {
        this.throwMissingErrorParameter(flag)
      }
    })

    const password = this.generateRandomSecuredPassword()
    const hashedPassword = await hash.make(password)
    try {
      await db.table('users').insert({
        email: this.email,
        full_name: `${this.firstname} ${this.lastname}`,
        first_name: this.firstname,
        last_name: this.lastname,
        password: hashedPassword,
        created_at: 'now()',
      })
    } catch (e) {
      if ('users_email_unique' === e.constraint) {
        console.log(`${this.ui.icons.cross}  A user with this email address already exists`)
        process.exit(1)
      }
    }

    this.ui
      .instructions()
      .heading(`${this.ui.icons.tick}  Administrator successfully created`)
      .add(`Email: ${this.email}`)
      .add(`Password: ${password}`)
      .render()
  }
}
