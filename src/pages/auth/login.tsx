import { NextPage } from 'next'
import { UserCredential } from '@firebase/auth'
import { useAuth } from '~/hooks/useAuth'
import { apiClient } from '~/utils/apiClient'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import LoginWithGoogle from '~/components/LoginWithGoogle'
import { Box, Button, Stack, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { EmailValidator, PasswordValidator } from '~/utils/validator'

export type Query = {
  redirect?: string
}

type LoginFormType = {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { googleLogin, emailLogin } = useAuth()
  const { handleSubmit, control } = useForm<LoginFormType>()

  const [loading, setLoading] = useState<'google' | 'email' | null>(null)

  const onEmailLogin = useCallback(async () => {
    let queryRedirect = router.query.redirect
    if (Array.isArray(queryRedirect)) queryRedirect = queryRedirect[0]

    await router.push(queryRedirect ?? '/')
  }, [router])
  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setLoading('email')
    await emailLogin(data.email, data.password)
      .then(onEmailLogin)
      .catch((e) => {
        console.log(e)
        setLoading(null)
      })
  }

  const onGoogleLogin = useCallback(
    async (res: UserCredential) => {
      const idToken = await res.user.getIdToken()
      apiClient.user.firebase
        .post({
          headers: { idtoken: idToken }
        })
        .then((res) => {
          let pushTo = res.body.redirectUri
          let queryRedirect = router.query.redirect
          if (Array.isArray(queryRedirect)) queryRedirect = queryRedirect[0]

          if (pushTo === '/auth/register') {
            pushTo += '?redirect=' + queryRedirect
          } else if (!pushTo) {
            pushTo = queryRedirect || '/'
          }
          router.push(pushTo)
        })
        .catch((err) => {
          console.log(err)
          alert('Login Failed')
        })
    },
    [router]
  )

  return (
    <Stack
      component="form"
      noValidate
      spacing={2}
      sx={{ maxWidth: 600, m: 'auto', py: 4 }}
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        rules={{ pattern: EmailValidator, required: true }}
        render={({ field, fieldState }) => (
          <TextField
            placeholder="メールアドレス"
            fullWidth
            helperText={fieldState.error?.message}
            {...field}
            error={fieldState.invalid}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          validate: (password) => PasswordValidator(password),
          required: true
        }}
        render={({ field, fieldState }) => (
          <Box sx={{ width: '100%', textAlign: 'right' }}>
            <TextField
              {...field}
              placeholder="パスワード"
              helperText={
                fieldState.error?.message ||
                '半角英大文字・英小文字・数字・記号から3種類以上 8-128文字'
              }
              type="password"
              error={fieldState.invalid}
              fullWidth
            />
          </Box>
        )}
      />

      <Button type="submit" color="primary" variant="contained">
        ログイン
      </Button>
      <LoginWithGoogle
        disabled={!!loading}
        onClick={() => {
          setLoading('google')
          googleLogin()
            .then(onGoogleLogin)
            .catch((e) => {
              console.log(e)
              setLoading(null)
            })
        }}
      />
    </Stack>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      test: (await apiClient.get()).body
    }
  }
}

export default LoginPage
