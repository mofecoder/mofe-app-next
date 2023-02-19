import { defineHooks } from '$/api/$relay'
import { User, WithInternalColumn } from '$/types'
import { verifyIdToken } from '$/service/firebase'
import { getUserByUid } from '$/service/users'
import admin from 'firebase-admin'

export type AdditionalRequest = {
  user: WithInternalColumn<User> | null
  idToken: Awaited<ReturnType<typeof verifyIdToken>>
}

export default defineHooks(() => ({
  onRequest: async (req, reply) => {
    const auth = admin.auth()

    let idToken = null
    if (typeof req.headers.idtoken === 'string') {
      try {
        const cookie = req.cookies['__session']
        if (cookie) {
          idToken = await auth.verifySessionCookie(cookie)
        }
        if (!idToken) {
          idToken = await verifyIdToken(req.headers.idtoken)
        }
      } catch {
        reply.status(400).send('Incorrect ID Token.')
        return reply
      }
    }
    if (idToken) {
      req.idToken = idToken
      // eslint-disable-next-line
      // @ts-expect-error
      req.user = await getUserByUid(idToken.uid)
    }
  }
}))
