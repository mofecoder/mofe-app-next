import { EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { auth } from '~/utils/auth'

export const useAuth = () => {
  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }
  const githubLogin = () => {
    const provider = new GithubAuthProvider()
    return signInWithPopup(auth, provider)
  }
  const emailLogin = () => {
    const provider = new EmailAuthProvider()
    return signInWithPopup(auth, provider)
  }
  return { googleLogin, githubLogin, emailLogin }
}
