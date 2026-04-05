/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'login.show': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login.show']['types'],
  },
  'login.auth': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login.auth']['types'],
  },
  'password.forgot.show': {
    methods: ["GET","HEAD"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['password.forgot.show']['types'],
  },
  'password.forgot.store': {
    methods: ["POST"],
    pattern: '/forgot-password',
    tokens: [{"old":"/forgot-password","type":0,"val":"forgot-password","end":""}],
    types: placeholder as Registry['password.forgot.store']['types'],
  },
  'password.reset.show': {
    methods: ["GET","HEAD"],
    pattern: '/reset-password/:token',
    tokens: [{"old":"/reset-password/:token","type":0,"val":"reset-password","end":""},{"old":"/reset-password/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['password.reset.show']['types'],
  },
  'password.reset': {
    methods: ["POST"],
    pattern: '/reset-password',
    tokens: [{"old":"/reset-password","type":0,"val":"reset-password","end":""}],
    types: placeholder as Registry['password.reset']['types'],
  },
  'replays': {
    methods: ["GET","HEAD"],
    pattern: '/replays',
    tokens: [{"old":"/replays","type":0,"val":"replays","end":""}],
    types: placeholder as Registry['replays']['types'],
  },
  'teams': {
    methods: ["GET","HEAD"],
    pattern: '/teams',
    tokens: [{"old":"/teams","type":0,"val":"teams","end":""}],
    types: placeholder as Registry['teams']['types'],
  },
  'users': {
    methods: ["GET","HEAD"],
    pattern: '/users',
    tokens: [{"old":"/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users']['types'],
  },
  'profile': {
    methods: ["GET","HEAD"],
    pattern: '/profile',
    tokens: [{"old":"/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
  'password_changes.show': {
    methods: ["GET","HEAD"],
    pattern: '/password/change',
    tokens: [{"old":"/password/change","type":0,"val":"password","end":""},{"old":"/password/change","type":0,"val":"change","end":""}],
    types: placeholder as Registry['password_changes.show']['types'],
  },
  'password_changes.update': {
    methods: ["POST"],
    pattern: '/password/change',
    tokens: [{"old":"/password/change","type":0,"val":"password","end":""},{"old":"/password/change","type":0,"val":"change","end":""}],
    types: placeholder as Registry['password_changes.update']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
