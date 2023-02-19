import '~/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { staticPath } from '~/utils/$path'
import { CssBaseline } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '~/pages/createEmotionCache'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { Layout } from '~/layout/Layout'

const clientSideEmotionCache = createEmotionCache()

const queryClient = new QueryClient()

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

interface AppProps2 extends AppProps {
  emotionCache: EmotionCache
  Component: NextPageWithLayout
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: AppProps2) => {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel="icon" href={staticPath.favicon_png} />
      </Head>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </CacheProvider>
  )
}

export default MyApp
