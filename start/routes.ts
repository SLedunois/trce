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
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('').redirect('replays')
    router.on('replays').renderInertia('replays', {}).as('replays')
    router.on('teams').renderInertia('teams', {}).as('teams')
    router.on('users').renderInertia('users', {}).as('users')
    router.on('profile').renderInertia('profile', {}).as('profile')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use([middleware.auth(), middleware.forcePasswordChange()])

// ✅ Route de changement de mot de passe : auth seulement (pas de boucle infinie !)
router
  .group(() => {
    router.get('/password/change', [controllers.PasswordChanges, 'show'])
    router.post('/password/change', [controllers.PasswordChanges, 'update'])
  })
  .use(middleware.auth()) // pas de forcePasswordChange ici
