import env from '#start/env'

import app from '@adonisjs/core/services/app'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  /**
   * Default connection used for all queries.
   */
  connection: env.get('DB_TYPE', 'pg'),

  connections: {
    /**
     * SQLite connection (default).
     */
    sqlite: {
      client: 'better-sqlite3',

      connection: {
        /**
         * Database file location.
         */
        filename: app.tmpPath('db.sqlite3'),
      },

      /**
       * Required by Knex for SQLite defaults.
       */
      useNullAsDefault: true,

      migrations: {
        /**
         * Sort migration files naturally by filename.
         */
        naturalSort: true,

        /**
         * Paths containing migration files.
         */
        paths: ['database/migrations'],
      },
    },
    pg: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST', 'localhost'),
        port: parseInt(env.get('DB_PORT', '5432')),
        user: env.get('DB_USER', 'trce'),
        password: env.get('DB_PASSWORD', 'trce'),
        database: env.get('DB_DATABASE', 'trce'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      debug: app.inDev,
    },
  },
})

export default dbConfig
