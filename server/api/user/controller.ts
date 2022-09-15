import { defineController } from './$relay'
import { getUserByUid } from '$/service/user'
import admin from 'firebase-admin'

export default defineController(() => ({
  post: async ({ headers }) => {
    const { idToken } = headers
    try {
      const res = await admin.auth().verifyIdToken(idToken)
      const user = await getUserByUid(res.uid)

      if (user) {
        // error
      }

    } catch {
      return { status: 400 }
    }
  },
}))
