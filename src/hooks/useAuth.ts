import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from '@firebase/auth'
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
  const emailLogin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  return { googleLogin, githubLogin, emailLogin }
}
