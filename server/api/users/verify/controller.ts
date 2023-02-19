import { defineController } from './$relay'
import admin from 'firebase-admin'

export default defineController(() => ({
  get: async ({ query }) => {
    if (!query.idToken) return { status: 400 }

    try {
      const res = await admin.auth().verifyIdToken(query.idToken)
      console.log(res)
      return {
        status: 400,
        body: `OK (${res.uid})`
      }
    } catch {
      return {
        status: 403,
        body: 'Not OK'
      }
    }
  },
}))
