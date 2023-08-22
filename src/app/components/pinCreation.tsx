export default function PinCreation({togglePinCreation, pinCreationToggle}: any) {
    return(
        <div className={`flex items-center flex-col absolute overflow-hidden top-[20rem] bg-white pin-menu ${pinCreationToggle ? 'pin-menu-open' : ''} ${pinCreationToggle ? 'border' : ''}`}>
            <h1 className="m-10">Pin Creation</h1>
            <button onClick={togglePinCreation}>Submit</button>
        </div>
    )
}