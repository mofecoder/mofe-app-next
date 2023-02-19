import { defineController } from './$relay'
import { createUserFromEmailAndPassword, updateUser } from '$/service/users'

export default defineController(() => ({
  // ログイン/連携登録
  post: async ({ body, user }) => {
    try {
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
            userName: body.userName,
            role: 'USER'
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
