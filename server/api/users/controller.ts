import { defineController } from './$relay'
import {
  createUserFromEmailAndPassword,
  getUserByUid,
  updateUser
} from '$/service/user'
import admin from 'firebase-admin'

export default defineController(() => ({
  // ログイン/連携登録
  post: async ({ headers, body }) => {
    const { idtoken: idToken } = headers
    const auth = admin.auth()

    let uid
    try {
      const res = await auth.verifyIdToken(idToken)
      uid = res.uid
    } catch (e) {
      return {
        status: 400
        // body: 'Incorrect ID Token.'
      }
    }

    try {
      let user = await getUserByUid(uid)

      if (user) {
        if (user.role !== 'TEMPORARY') {
          return {
            status: 409,
            body: 'Specific user is already registered.'
          }
        }
        if (user.email !== body.email || user.userName !== body.userName) {
          user = await updateUser(user.uid, {
            email: body.email,
            userName: body.userName
          })
        }
      } else if (!user) {
        user = await createUserFromEmailAndPassword(body.uid, body.email)
      }

      return { status: 200, body: user }
    } catch (e) {
      console.log(e)
      return {
        status: 409,
        body: 'Update Failed.'
      }
    }
  }
}))
