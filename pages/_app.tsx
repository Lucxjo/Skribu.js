import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/nav'
import { Toaster } from 'react-hot-toast'
import { UserContext } from '../lib/context'
import { useUserData } from '../lib/hooks'
import Link from 'next/link'

function App({ Component, pageProps }: AppProps) {
  const userData = useUserData()
  
  return (
		<UserContext.Provider value={userData}>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />

			<footer className="text-sm">
				All emojis designed by <Link href="https://openmoji.org">OpenMoji</Link>. License:{' '}
				<Link href="https://creativecommons.org/licenses/by-sa/4.0/#">CC BY-SA 4.0</Link>
			</footer>
		</UserContext.Provider>
	);
}
export default App
