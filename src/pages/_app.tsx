import { AuthenticationProvider } from '@/data/contexts/Authentication'
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return ( 
    <MantineProvider theme={{
      colorScheme: 'dark'
    }}>
      <Notifications />
      <AuthenticationProvider>
        <Component {...pageProps} />

      </AuthenticationProvider>

    </MantineProvider>

    )
}
