/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('login', [controllers.Session, 'show']).as('login.show')
    router.post('login', [controllers.Session, 'auth']).as('login.auth')

    router
      .get('forgot-password', [controllers.PasswordResets, 'showForgotPassword'])
      .as('password.forgot.show')
    router
      .post('forgot-password', [controllers.PasswordResets, 'processForgotPassword'])
      .as('password.forgot.store')

    router
      .get('reset-password/:token', [controllers.PasswordResets, 'showResetPassword'])
      .as('password.reset.show')

    router
      .post('reset-password', [controllers.PasswordResets, 'resetPassword'])
      .as('password.reset')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('').redirect('replays.show')
    router.on('replays').renderInertia('replays', {}).as('replays.show')
    router.get('teams', [controllers.Teams, 'list']).as('teams.list')
    router.get('teams/:id', [controllers.Teams, 'show']).as('teams.show')
    router.post('teams', [controllers.Teams, 'create']).as('teams.create')
    router.put('teams', [controllers.Teams, 'update']).as('teams.update')
    router.delete('teams', [controllers.Teams, 'delete']).as('teams.delete')
    router.on('users').renderInertia('users', {}).as('users.show')
    router.on('profile').renderInertia('profile', {}).as('profile.show')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use([middleware.auth(), middleware.forcePasswordChange()])

router
  .group(() => {
    router.get('password/change', [controllers.PasswordChanges, 'show'])
    router.post('password/change', [controllers.PasswordChanges, 'update'])
  })
  .use(middleware.auth())
