import { NextPage } from 'next'
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { auth } from '~/utils/auth'
import { useAuth } from '~/hooks/useAuth'
import { Button } from '@mui/material'

const Login: NextPage = () => {
  const { googleLogin } = useAuth()

  return <>
    <p>ログイン</p>
    <Button onClick={() => googleLogin().then(res => console.log(res.user))}>Google でログイン</Button>
  </>
}

export default Login
