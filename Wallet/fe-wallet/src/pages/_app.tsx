import 'antd/dist/antd.css'; // antd version 5 is not available to import .css
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div className='font-sansSerif'><Component {...pageProps} /></div>
}
