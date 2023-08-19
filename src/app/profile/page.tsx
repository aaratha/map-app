'use client'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'

export default function Profile() {
    const searchParams = useSearchParams()
    const userId = searchParams.get('userId')
    const photo = searchParams.get('photo')
    const userName = searchParams.get('userName')
    return(
        <div className="bg-white flex flex-col text-black min-h-screen w-screen">
            <h1 className="p-3 text-3xl text-center border-b border-black border-opacity-25">Profile</h1>
            <div className='flex flex-col border border-black border-opacity-25 rounded-lg p-3 w-[15rem] m-auto mt-5 items-center'>
                <Image src={photo ?? ''} alt='pfp' width={100} height={100} className='rounded-full mb-2'></Image>
                <h1 className='text-2xl'>{userName}</h1>
            </div>
            {/* <Image src={photo} alt='pfp'></Image> */}
        </div>
    )
}