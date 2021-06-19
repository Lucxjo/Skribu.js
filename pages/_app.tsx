import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/nav'

function App({ Component, pageProps }: AppProps) {
  return <>
    <Navbar></Navbar>
    <Component {...pageProps} />
  </>
}
export default App
