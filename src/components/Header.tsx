import { FC, useCallback } from 'react'
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material'
import { useUser } from '~/hooks/useUser'
import { AccountCircle, Login, Logout } from '@mui/icons-material'
import { auth } from '~/utils/auth'
import { useRouter } from 'next/router'

const Header: FC = () => {
  const { user } = useUser()
  const router = useRouter()

  const signOut = useCallback(async () => {
    await auth.signOut()
    await router.push('/')
  }, [])

  const signIn = async () => {
    await router.push(`/auth/login?redirect=${router.pathname}`)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
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
