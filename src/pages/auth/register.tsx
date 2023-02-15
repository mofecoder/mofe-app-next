import { NextPage } from 'next'
import {
  Alert,
  AlertColor,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import QuestionIcon from '@mui/icons-material/QuestionMark'
import { auth } from '~/utils/auth'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import './register.module.scss'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateEmail
} from '@firebase/auth'
import React, { useState } from 'react'
import { apiClient } from '~/utils/apiClient'
import { useRouter } from 'next/router'
import {
  EmailValidator,
  PasswordValidator,
  UsableSymbols
} from '~/utils/validator'

export type Query = {
  redirect?: string
}

type FormType = {
  userName: string
  email: string
  password?: string
}

const AuthRegisterPage: NextPage = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState(auth.currentUser)
  onAuthStateChanged(auth, (user) => setCurrentUser(user))

  const [submitError, setSubmitError] = useState<{
    severity: AlertColor
    message: string
  } | null>(null)

  const { handleSubmit, control } = useForm<FormType>({
    defaultValues: {
      userName: '',
      email: currentUser?.email || '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const onError = (err: Error) => {
      setSubmitError({ severity: 'error', message: err.message })
      return null
    }

    const check = await apiClient.user.checkUsername.get({
      query: { userName: data.userName }
    })
    if (!check.body.isOk) {
      setSubmitError({
        severity: 'warning',
        message: '指定されたユーザ名はすでに使われています．'
      })
      return
    }

    let user = currentUser
    if (currentUser && currentUser.email !== data.email) {
      await updateEmail(currentUser, data.email).catch(onError)
    } else if (!currentUser && data.password) {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
        .then((credentials) => credentials.user)
        .catch(onError)
      if (!res) return
      user = res
    }

    if (!user) {
      setSubmitError({
        severity: 'warning',
        message: '何らかの問題が発生しました'
      })
      return
    }

    await apiClient.user
      .post({
        headers: {
          idtoken: await user.getIdToken()
        },
        body: {
          email: data.email,
          uid: user.uid,
          userName: data.userName
        }
      })
      .then(() => {
        let redirect = router.query.redirect
        if (Array.isArray(redirect)) redirect = redirect[0]
        router.push(redirect ?? '/')
      })
      .catch(onError)
  }

  const required = 'この項目は必須です'
  const symbols = UsableSymbols.join(' ')
  const validations = {
    userName: {
      value: /[a-zA-Z]\w{3,15}/,
      message: 'ユーザ名の形式が誤っています'
    },
    email: EmailValidator,
    password: (password: string | undefined) => PasswordValidator(password)
  }

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{ maxWidth: 600, m: 'auto', py: 4 }}
      alignItems="center"
    >
      {submitError ? (
        <Alert severity={submitError.severity}>
          <AlertTitle>アカウントの登録に失敗しました</AlertTitle>
          {submitError.message}
        </Alert>
      ) : null}
      <Controller
        name="userName"
        control={control}
        rules={{ pattern: validations.userName, required }}
        render={({ field, fieldState }) => (
          <TextField
            placeholder="ユーザ名"
            fullWidth
            helperText={
              fieldState.error?.message ||
              '半角英数とアンダーバー 4-16文字 先頭は英字 大小文字区別なし'
            }
            {...field}
            error={fieldState.invalid}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{ pattern: validations.email, required }}
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
      {currentUser ? (
        <></>
      ) : (
        <Controller
          name="password"
          control={control}
          rules={{ validate: validations.password, required }}
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
              <Typography variant="caption">
                使用可能な記号を見る
                <Tooltip title={symbols}>
                  <IconButton disableRipple={true} size="small">
                    <QuestionIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
            </Box>
          )}
        />
      )}
      <Button fullWidth type="submit" variant="contained">
        登録する
      </Button>
    </Stack>
  )
}

export default AuthRegisterPage
