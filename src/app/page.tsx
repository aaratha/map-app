import Image from 'next/image'
import SimpleMap from './components/map'

export default function Home() {
  return (
    <main className="flex text-black min-h-screen flex-col items-center bg-gradient-to-b from-gray-200 to-gray-300">
      <div>
        <h1 className='text-4xl mt-10 mb-10'>Pin It!</h1>
      </div>
      <SimpleMap />
    </main>
  )
}
