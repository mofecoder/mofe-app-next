import type { OptionalQuery as OptionalQuery0 } from '../pages/auth/login'
import type { OptionalQuery as OptionalQuery1 } from '../pages/auth/register'

export const pagesPath = {
  "auth": {
    "login": {
      $url: (url?: { query?: OptionalQuery0, hash?: string }) => ({ pathname: '/auth/login' as const, query: url?.query, hash: url?.hash })
    },
    "register": {
      $url: (url?: { query?: OptionalQuery1, hash?: string }) => ({ pathname: '/auth/register' as const, query: url?.query, hash: url?.hash })
    }
  },
  "createEmotionCache": {
    $url: (url?: { hash?: string }) => ({ pathname: '/createEmotionCache' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  $404_html: '/404.html',
  favicon_png: '/favicon.png',
  google_svg: '/google.svg',
  index_html: '/index.html',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
