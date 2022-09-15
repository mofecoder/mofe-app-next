import { NextPage } from 'next'
import React, { useState } from 'react'
import { Button, Input, TextField } from '@mui/material'
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { auth } from '~/utils/auth'

const Signup: NextPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!email || !password) return
    await createUserWithEmailAndPassword(auth, email, password)
      .then(res => {
        console.log(res)
        res.user.getIdToken().then(console.log)
      })
  }

  return <form >
    <TextField placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)} type="email" />
    <TextField placeholder="パスワード" onChange={(e) => setPassword(e.target.value)} type="password" />
    <Button type="submit" variant="contained" onClick={onSubmit}>登録</Button>
  </form>
}

export default Signup
