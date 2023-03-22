import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { SongItems } from './'

function NewRelease() {
    const { newRelease } = useSelector(state => state.app)
    const [isActive, setIsActive] = useState(0)
    const [songs, setSongs] = useState([])

    useEffect(() => {
        isActive ? setSongs(newRelease?.items?.others) : setSongs(newRelease?.items?.vPop)
    }, [isActive, newRelease])

    return (
        <div className='mt-12 px-[59px] flex flex-col gap-5'>
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold'>{newRelease?.title}</h3>
                <span className='text-xs'>TẤT CẢ</span>
            </div>
            <div className='flex items-center gap-5 text-xs'>
                <button
                    type='button'
                    onClick={() => setIsActive(0)}
                    className={`py-1 px-4 rounded-l-full hover: rounded-r-full border border-gray-400  ${isActive === 0 && 'bg-[#0e8080] text-white'}`}
                >
                    VIỆT NAM
                </button>

                <button
                    type='button'
                    onClick={() => setIsActive(1)}
                    className={`py-1 px-4 rounded-l-full hover: rounded-r-full border border-gray-400  ${isActive === 1 && 'bg-[#0e8080] text-white'}`}
                >
                    QUỐC TẾ
                </button>
            </div>
            <div className='flex flex-wrap w-full'>
                {songs?.map(item => (
                    <div key={item.encodeId} className='w-[45%] min-[1024px]:w-[30%]'>
                        <SongItems
                            key={item.encodeId}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artists={item.artistsNames}
                            releaseDate={item.releaseDate}
                            sid={item.encodeId}
                        />
                    </div>

                ))}
            </div>
        </div>
    )
}

export default NewRelease