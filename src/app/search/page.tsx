import {BiSearch} from 'react-icons/bi';
import {BiArrowBack} from 'react-icons/bi';

export default function Search() {
    return(
        <div className="bg-white h-[100vh] w-screen text-black flex flex-col">
            <div className='flex flex-row w-screen'>
                <a href='/' className='flex w-[3.6rem]'><button className='border border-black border-opacity-0 bg-green-600 text-white m-4 mt-7 mr-0 rounded-full w-[3.2rem] flex content-center items-center justify-center hover:border-opacity-100 hover:scale-105 hover:shadow-md transition-all'><BiArrowBack className='scale-150' /></button></a>
                <div className='w-full flex flex-row border border-green-600 rounded-lg p-2 pl-3 m-4 mt-7 items-center hover:border-opacity-100 transition-all'>
                    <BiSearch className='scale-125 mr-3' />
                    <input placeholder="Search" className="w-full focus:outline-none"></input>
                </div>
            </div>
        </div>
    )
}