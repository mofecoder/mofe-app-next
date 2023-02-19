import { ReactElement } from 'react'
import Header from '~/components/Header'

type LayoutProps = {
  readonly children: ReactElement
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    {children}
  </>
)
