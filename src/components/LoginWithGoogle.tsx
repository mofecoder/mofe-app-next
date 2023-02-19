import { Button, ButtonProps, styled } from '@mui/material'
import { staticPath } from '~/utils/$path'
import React, { useMemo } from 'react'

type Props = Omit<ButtonProps, 'variant' | 'sx' | 'startIcon'>

const LoginWithGoogle: React.FC<Props> = (props) => {
  const googleIcon = useMemo(() => {
    const Img = styled('img')(() => ({
      width: '40px',
      height: '40px'
    }))
    return <Img src={staticPath.google_svg} alt="Google" />
  }, [])

  return (
    <Button
      variant="outlined"
      sx={{
        fontFamily: 'Roboto',
        color: '#000000',
        height: '40px',
        px: '8px',
        border: 'none',
        boxShadow:
          '0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%)',
        '&:hover': {
          border: 'none',
          backgroundColor: 'rgba(158,158,158,.2)'
        }
      }}
      startIcon={googleIcon}
      {...props}
    >
      Google でログイン
    </Button>
  )
}

export default LoginWithGoogle
