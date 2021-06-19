import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/nav'
import { Toaster } from 'react-hot-toast'

function App({ Component, pageProps }: AppProps) {
  return <>
    <Navbar />
    <Component {...pageProps} />
    <Toaster />
  </>
}
export default App
