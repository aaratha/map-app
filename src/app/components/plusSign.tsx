import {AiOutlinePlus} from 'react-icons/ai';
import NewPinMenu from './newPinMenu';
import { useState } from 'react';

export default function PlusSign({toggleClickPin, clickPinToggle}: any) {
    const [newPinMenuToggle, setNewPinMenuToggle] = useState<boolean>(false);
    function toggleNewPinMenu() {
        setNewPinMenuToggle(!newPinMenuToggle);
        console.log('newPinMenuToggle: ' + newPinMenuToggle);
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            <button onClick={toggleNewPinMenu} className='scale-150 hover:scale-[158%] transition-all hover:shadow-md absolute bottom-8 bg-white p-6 rounded-full border border-green-600 hover:border-white hover:bg-green-600 hover:text-white text-green-900 '><AiOutlinePlus className=' scale-150' /></button>
            <NewPinMenu toggleNewPinMenu={toggleNewPinMenu} newPinMenuToggle={newPinMenuToggle} toggleClickPin={toggleClickPin} clickPinToggle={clickPinToggle} />
        </div>
    )
}