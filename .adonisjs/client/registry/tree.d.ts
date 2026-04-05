/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  login: {
    show: typeof routes['login.show']
    auth: typeof routes['login.auth']
  }
  password: {
    forgot: {
      show: typeof routes['password.forgot.show']
      store: typeof routes['password.forgot.store']
    }
    reset: typeof routes['password.reset'] & {
      show: typeof routes['password.reset.show']
    }
  }
  replays: typeof routes['replays']
  teams: typeof routes['teams']
  users: typeof routes['users']
  profile: typeof routes['profile']
  session: {
    destroy: typeof routes['session.destroy']
  }
  passwordChanges: {
    show: typeof routes['password_changes.show']
    update: typeof routes['password_changes.update']
  }
}
