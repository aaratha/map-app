import Image from 'next/image'
import SimpleMap from './components/map'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div>
        <h1 className='text-4xl mt-20 mb-20'>Pin It!</h1>
      </div>
      <SimpleMap />
    </main>
  )
}
