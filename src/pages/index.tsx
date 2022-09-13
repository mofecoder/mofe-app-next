import Head from 'next/head'
import { useCallback, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useAspidaQuery } from '@aspida/react-query'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import type { Task } from '$prisma/client'
import type { FormEvent, ChangeEvent } from 'react'
import Layout from '~/components/Layout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const queryClient = useQueryClient()
  return (
    <Layout>
      <Head>
        <title>frourio-todo-app</title>
      </Head>

      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className={styles.description}>frourio-todo-app</p>

    </Layout>
  )
}

export default Home
