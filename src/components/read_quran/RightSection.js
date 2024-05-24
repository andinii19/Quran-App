import React, { useState, useEffect } from 'react';

const RightSection = ({ detailSurah }) => {

    function isNotEmpty() {
        return Object.keys(detailSurah).length > 0;
    }

    return (
        <div className="bg-white basis-3/4 flex flex-col">
            {isNotEmpty() ? (
                <>
                    <HeaderSection namaSurah={detailSurah.nama_latin} artiSurah={detailSurah.arti} nomorSurah={detailSurah.nomor} />
                    <div className="h-full w-full overflow-y-auto">
                        {detailSurah.ayat.map((data, index) => (
                            <ItemAyat key={index} ayat={data.ar} nomorAyat={data.nomor} artiAyat={data.idn} latin={data.tr} />
                        ))}
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

export default RightSection;

function HeaderSection({ namaSurah, artiSurah, nomorSurah }) {
    const [audioUrl, setAudioUrl] = useState(null);
    const [audio] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioUrl) {
            audio.src = audioUrl;
            if (isPlaying) {
                audio.play();
            }
        }
    }, [audioUrl, isPlaying, audio]);

    const fetchAudioUrl = async () => {
        try {
            const response = await fetch(`https://equran.id/api/surat/${nomorSurah}`);
            const data = await response.json();
            if (data.audio) {
                setAudioUrl(data.audio);
            } else {
                console.error('Audio URL not found');
            }
        } catch (error) {
            console.error('Error fetching audio URL:', error);
        }
    };

    const togglePlayPause = () => {
        if (!audioUrl) {
            fetchAudioUrl();
        }
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="h-[96px] w-full flex justify-between items-center px-8 border-b border-gray-200">
            <div className="flex flex-col justify-center ">
                <h3 className="text-3xl font-bold  text-sky-800">{namaSurah}</h3>
                <p className="text-sm font-thin">{artiSurah}</p>
            </div>
            <img
                src={isPlaying ? "pause.png" : "play.png"}
                alt={isPlaying ? "Pause Audio" : "Play Audio"}
                height={30}
                width={30}
                onClick={togglePlayPause}
            />
        </div>
    );
}

function ItemAyat({ ayat, nomorAyat, artiAyat, latin }) {
    return (
        <div className="w-full px-6 py-4 border-b border-gray-200">
            <div className="w-full h-full flex justify-end mb-2">
                <h3 className="text-3xl font-black  text-sky-800 ">{ayat}</h3>
            </div>
            <div className="w-full h-full flex justify-end mb-4">
                <span className=" text-sm font-thin">
                    {latin}
                </span>
            </div>
            <span className=" text-md font-normal">
                {nomorAyat}. {artiAyat}
            </span>
        </div>
    );
}
