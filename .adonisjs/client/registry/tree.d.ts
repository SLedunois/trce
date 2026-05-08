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
  replays: {
    show: typeof routes['replays.show']
  }
  teams: {
    list: typeof routes['teams.list']
    show: typeof routes['teams.show']
    create: typeof routes['teams.create']
    update: typeof routes['teams.update']
    delete: typeof routes['teams.delete']
  }
  users: {
    show: typeof routes['users.show']
  }
  profile: {
    show: typeof routes['profile.show']
  }
  session: {
    destroy: typeof routes['session.destroy']
  }
  passwordChanges: {
    show: typeof routes['password_changes.show']
    update: typeof routes['password_changes.update']
  }
}
