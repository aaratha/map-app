import {MdTitle} from 'react-icons/md';
import {MdSubtitles} from 'react-icons/md';

export default function PinCreation({togglePinCreation, pinCreationToggle, handlePinSubmit}: any) {
    return(
        <div className={`w-[18rem] h-[40vh] flex items-center flex-col absolute overflow-hidden top-[20rem] bg-white pin-menu ${pinCreationToggle ? 'pin-menu-open' : ''} ${pinCreationToggle ? 'border' : ''}`}>
            <h1 className="mt-5">Pin Creation</h1>
            <form className="flex flex-col" onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                handlePinSubmit(formData); }}>
                <div className='mt-2 flex flex-row border border-green-600 items-center rounded-lg'>
                    <MdTitle className='m-2 text-green-600' />
                    <input placeholder="Enter title..." className="focus:outline-none" name="title"></input>
                </div>
                <div className='mt-3 mb-3 flex flex-row border border-green-600 items-center rounded-lg'>
                    <MdSubtitles className='m-2 text-green-600' />
                    <input placeholder="Enter description..." className="focus:outline-none" name="description"></input>
                </div>
                <button type="submit" onClick={togglePinCreation} className='bg-green-600 border-green-600 rounded-full ml-5 mr-5 p-2 mb-4 text-white text-lg hover:bg-white hover:border hover:shadow-md hover:scale-105 hover:text-green-600 transition-all' >Submit</button>
            </form>
        </div>
    )
}