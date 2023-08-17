interface menuProps {
    menuToggle: boolean;
    handleMenuClick: () => void;
}

export default function Menu({menuToggle, handleMenuClick}: menuProps) {
    return(
        <div className={`menu ${menuToggle ? 'menu-open' : ''} bg-white h-screen z-20 overflow-hidden`}>
            <div className="h-full w-full p-4 flex flex-col">
                <h1 className="text-2xl">Menu</h1>
                <button onClick={handleMenuClick} className=" mt-auto border border-black border-opacity-25 p-2 text-lg hover:scale-105 hover:border-opacity-100 hover:shadow-md rounded-lg transition-all">Close</button>
            </div>
        </div>
    )
}