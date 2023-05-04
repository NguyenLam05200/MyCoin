import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from 'antd'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24`}
    >
      <div className="relative">
        <Image
          src="/assets/images/branch.png"
          alt="Logo"
          width={400}
          height={400}
          priority
        />
      </div>
      <div className='mt-10 flex flex-col gap-y-4 items-center min-w-[400px] m-auto'>
        <Button
          className='duration-150 rounded-lg text-lg w-full text-blue-2 border-blue-2 hover:text-white hover:bg-blue-2 size-lg h-[50px]'>Sign in</Button>
        <Button
          onClick={() => router.push("/account/new")}
          className='duration-150 rounded-lg text-lg w-full text-blue-2 border-blue-2 hover:text-white hover:bg-blue-2 size-lg h-[50px]'>Create new account</Button>
        {/* <Button className='rounded-lg text-lg w-full text-blue-2 border-blue-2 hover:text-white hover:bg-blue-2 size-lg h-[50px]'>Import existing account</Button>
        <Button className='rounded-lg text-lg w-full text-blue-2 border-blue-2 hover:text-white hover:bg-blue-2 size-lg h-[50px]'>Restore from mnemonic</Button> */}
      </div>
    </main>
  )
}
