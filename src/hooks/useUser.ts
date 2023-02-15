import { useState } from 'react'
import { auth } from '~/utils/auth'
import { onAuthStateChanged } from '@firebase/auth'

export const useUser = () => {
  const [user, setUser] = useState(auth.currentUser)
  onAuthStateChanged(auth, (user) => {
    console.log('changed %o', user)
    setUser(user)
  })
  return { user }
}
