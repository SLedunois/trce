import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/forgot_password': ExtractProps<(typeof import('../../inertia/pages/auth/forgot_password.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/password_change': ExtractProps<(typeof import('../../inertia/pages/auth/password_change.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'profile': ExtractProps<(typeof import('../../inertia/pages/profile.tsx'))['default']>
    'replays': ExtractProps<(typeof import('../../inertia/pages/replays.tsx'))['default']>
    'teams': ExtractProps<(typeof import('../../inertia/pages/teams.tsx'))['default']>
    'users': ExtractProps<(typeof import('../../inertia/pages/users.tsx'))['default']>
  }
}
