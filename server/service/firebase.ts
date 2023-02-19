import admin from 'firebase-admin'

export const verifyIdToken = async (idToken: string) => {
  const auth = admin.auth()
  try {
    return await auth.verifyIdToken(idToken)
  } catch (e) {
    return null
  }
}
