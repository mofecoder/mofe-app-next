import path from 'path'
import Fastify, { FastifyServerFactory } from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifyJwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import {
  API_BASE_PATH,
  API_JWT_SECRET,
  API_UPLOAD_DIR
} from '$/service/envValues'
import server from '$/$server'

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory })
  app.register(helmet)
  app.register(cookie)
  // TODO: FIXME
  app.register(cors, {
    credentials: true,
    origin: (origin, callback) => {
      callback(null, true)
    }
  })
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/'
  })
  if (API_UPLOAD_DIR) {
    app.after(() => {
      app.register(fastifyStatic, {
        root: path.resolve(__dirname, API_UPLOAD_DIR),
        prefix: '/upload/',
        decorateReply: false
      })
    })
  }
  app.register(fastifyJwt, { secret: API_JWT_SECRET })
  server(app, { basePath: API_BASE_PATH })
  return app
}
