import { FC, useCallback } from 'react'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { useUser } from '~/hooks/useUser'
import { AccountCircle, Login, Logout } from '@mui/icons-material'
import { auth } from '~/utils/auth'
import { useRouter } from 'next/router'
import { pagesPath } from '~/utils/$path'
import Link from 'next/link'

const Header: FC = () => {
  const { user } = useUser()
  const router = useRouter()

  const signOut = useCallback(async () => {
    await auth.signOut()
    await router.push('/')
  }, [])

  const signIn = async () => {
    let query = router.pathname.startsWith('/auth')
      ? undefined
      : { redirect: router.asPath }
    await router.push(pagesPath.auth.login.$url({ query }))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography component={Link} href="/" variant="h6" sx={{ flexGrow: 1 }}>
          MOFE
        </Typography>
        {user ? (
          <>
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <Tooltip title="ログアウト">
              <IconButton size="large" color="inherit" onClick={signOut}>
                <Logout />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <IconButton size="large" color="inherit" onClick={signIn}>
            <Login />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
