export const pagesPath = {
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  $404_html: '/404.html',
  favicon_png: '/favicon.png',
  index_html: '/index.html',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
