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
    'replays.show': { paramsTuple?: []; params?: {} }
    'teams.list': { paramsTuple?: []; params?: {} }
    'teams.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'teams.create': { paramsTuple?: []; params?: {} }
    'teams.update': { paramsTuple?: []; params?: {} }
    'teams.delete': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'password_changes.show': { paramsTuple?: []; params?: {} }
    'password_changes.update': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'login.show': { paramsTuple?: []; params?: {} }
    'password.forgot.show': { paramsTuple?: []; params?: {} }
    'password.reset.show': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'replays.show': { paramsTuple?: []; params?: {} }
    'teams.list': { paramsTuple?: []; params?: {} }
    'teams.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.show': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'password_changes.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'login.show': { paramsTuple?: []; params?: {} }
    'password.forgot.show': { paramsTuple?: []; params?: {} }
    'password.reset.show': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'replays.show': { paramsTuple?: []; params?: {} }
    'teams.list': { paramsTuple?: []; params?: {} }
    'teams.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.show': { paramsTuple?: []; params?: {} }
    'profile.show': { paramsTuple?: []; params?: {} }
    'password_changes.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'login.auth': { paramsTuple?: []; params?: {} }
    'password.forgot.store': { paramsTuple?: []; params?: {} }
    'password.reset': { paramsTuple?: []; params?: {} }
    'teams.create': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'password_changes.update': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'teams.update': { paramsTuple?: []; params?: {} }
  }
  DELETE: {
    'teams.delete': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}