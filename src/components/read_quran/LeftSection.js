import ListSurah from "./ListSurah"

const LeftSection = ({listSurah, getDetailSurah}) => {


    return (
        <div className="bg-gray-200 basis-1/4 flex flex-col">
            <InputSearch />
            <ListSurah listSurah={listSurah} getDetailSurah={getDetailSurah}/>
        </div>
    )
}

export default LeftSection

const InputSearch = () => {
    return (
        <div className=" bg-sky-800 w-full h-24 flex flex-row justify-center items-center shadow-xl">
            <img src="islam.png" alt=".." width={50} height={50}/>
                <h3 className="text-3xl font-bold  text-white ms-4">AL - QUR'AN</h3>
            {/* <h1 className="text-2xl font-bold text-white ">WEBSITE AL-QURAN</h1> */}
            {/* <div className="bg-white w-fu mx-4 rounded-xl py-1 px-8 relative">
                <img src="search.png" alt=".." width={20} height={20} className=" absolute top-3 left-4"/>
                <input className="w-full h-full py-2 ml-4" placeholder="Cari surah.."></input>
            </div> */}
        </div>
    )
}
