import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import * as apis from '../apis'
import icons from '../ultis/icons'

const { AiFillHeart, AiOutlineHeart, BsThreeDots, CiRepeat,
    MdSkipNext,
    MdSkipPrevious,
    CiShuffle, FaPlay,
    FaPause } = icons

const Player = () => {
    const audioEl = new Audio()
    const [songInfo, setSongInfo] = useState(null)
    const { curSongId, isPlaying } = useSelector(state => state.music)
    const [source, setSource] = useState(null)
    
    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])

            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }

            if (res2.data.err === 0) {
                setSource(res2.data.data['128'])
            }
        }

        fetchDetailSong()
    }, [curSongId])

    useEffect(() => {

    }, [curSongId])

    const handleTogglePlay = () => {
        
    }

    return (
        <div className='bg-[#c0d8d8] px-5 h-full flex' >
            <div className='w-[30%] flex-auto flex items-center gap-4'>
                <img src={songInfo?.thumbnail} alt="thumbnail" className='w-16 h-16 object-cover rounded-md' />
                <div className='flex flex-col gap-2'>
                    <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                    <span className='text-xs text-gray-500 '>{songInfo?.artistsNames}</span>
                </div>
                <div className='flex gap-4 pl-2'>
                    <span>
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <BsThreeDots size={16} />
                    </span>
                </div>
            </div>
            <div className='w-[40%] flex-auto flex flex-col items-center justify-center gap-2'>
                <div className='flex gap-8 justify-center'>
                    <span className='cursor-pointer'><CiShuffle size={24} /></span>
                    <span className='cursor-pointer'><MdSkipPrevious size={24} /></span>
                    <span
                        onClick={handleTogglePlay}
                        className='p-2 border border-gray-700 rounded-full cursor-pointer'>
                        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                    </span>
                    <span

                        className='cursor-pointer'><MdSkipNext size={24} /></span>
                    <span className='cursor-pointer'><CiRepeat size={24} /></span>
                </div>

                <div>
                    ksdjfk
                </div>
            </div>
            <div className='w-[30%] flex-auto'>
                settings
            </div>
        </div>
    )
}

export default Player