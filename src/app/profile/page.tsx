'use client'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'

export default function Profile() {
    const searchParams = useSearchParams()
    const userId = searchParams.get('userId')
    const photo = searchParams.get('photo')
    const userName = searchParams.get('userName')
    return(
        <div className="bg-white flex flex-col text-black w-screen">
            <div className='h-[7vh] items-center text-center justify-center flex flex-row border-b border-black border-opacity-25'>
                <h1 className="p-3 text-3xl text-center mr-3">Profile:</h1>
                <p className='text-lg'>AA.Ratha</p>
            </div>
            <div className='overflow-scroll h-[93vh]'>
                <div className='flex flex-col border border-black border-opacity-25 rounded-lg p-3 m-5 mb-3 items-center'>
                    <Image src={photo ?? ''} alt='pfp' width={100} height={100} className='rounded-full mb-2'></Image>
                    <h2 className='text-2xl'>{userName}</h2>
                    <div className='mt-3 flex flex-row'>
                        <div className='mr-14 flex flex-col items-center'>
                            <p className='text-xl font-bold'>34</p>
                            <h3 className=''>Following</h3>
                        </div>
                        <div className='mr-14 flex flex-col items-center'>
                            <p className='text-xl font-bold'>34</p>
                            <h3>Followers</h3>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='text-xl font-bold'>34</p>
                            <h3>Pins</h3>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl text-center'>Pins</h2>
                    <div className='flex flex-row flex-wrap justify-center'>
                        <div className='m-2 p-2 border border-black border-opacity-25 rounded-lg'>
                            <Image src='https://picsum.photos/200' alt='pfp' width={200} height={200}></Image>
                        </div>
                        <div className='m-2 p-2 border border-black border-opacity-25 rounded-lg'>
                            <Image src='https://picsum.photos/200' alt='pfp' width={200} height={200}></Image>
                        </div>
                        <div className='m-2 p-2 border border-black border-opacity-25 rounded-lg'>
                            <Image src='https://picsum.photos/200' alt='pfp' width={200} height={200}></Image>
                        </div>
                        <div className='m-2 p-2 border border-black border-opacity-25 rounded-lg'>
                            <Image src='https://picsum.photos/200' alt='pfp' width={200} height={200}></Image>
                        </div>
                        <div className='m-2 p-2 border border-black border-opacity-25 rounded-lg'>
                            <Image src='https://picsum.photos/200' alt='pfp' width={200} height={200}></Image>
                        </div>
                        <div className='m-2 p-2 border border-black border-opacity-25 rounded-lg'>
                            <Image src='https://picsum.photos/200' alt='pfp' width={200} height={200}></Image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}