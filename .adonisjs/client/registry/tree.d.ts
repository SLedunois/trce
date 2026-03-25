/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  replays: typeof routes['replays']
  teams: typeof routes['teams']
  users: typeof routes['users']
  profile: typeof routes['profile']
  passwordChanges: {
    show: typeof routes['password_changes.show']
    update: typeof routes['password_changes.update']
  }
}
