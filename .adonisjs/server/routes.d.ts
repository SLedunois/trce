import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'login.show': { paramsTuple?: []; params?: {} }
    'login.auth': { paramsTuple?: []; params?: {} }
    'password.forgot.show': { paramsTuple?: []; params?: {} }
    'password.forgot.store': { paramsTuple?: []; params?: {} }
    'password.reset.show': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'password.reset': { paramsTuple?: []; params?: {} }
    'replays': { paramsTuple?: []; params?: {} }
    'teams': { paramsTuple?: []; params?: {} }
    'users': { paramsTuple?: []; params?: {} }
    'profile': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'password_changes.show': { paramsTuple?: []; params?: {} }
    'password_changes.update': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'login.show': { paramsTuple?: []; params?: {} }
    'password.forgot.show': { paramsTuple?: []; params?: {} }
    'password.reset.show': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'replays': { paramsTuple?: []; params?: {} }
    'teams': { paramsTuple?: []; params?: {} }
    'users': { paramsTuple?: []; params?: {} }
    'profile': { paramsTuple?: []; params?: {} }
    'password_changes.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'login.show': { paramsTuple?: []; params?: {} }
    'password.forgot.show': { paramsTuple?: []; params?: {} }
    'password.reset.show': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'replays': { paramsTuple?: []; params?: {} }
    'teams': { paramsTuple?: []; params?: {} }
    'users': { paramsTuple?: []; params?: {} }
    'profile': { paramsTuple?: []; params?: {} }
    'password_changes.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.auth': { paramsTuple?: []; params?: {} }
    'password.forgot.store': { paramsTuple?: []; params?: {} }
    'password.reset': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'password_changes.update': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}