import React from 'react'
import { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'

import * as actions from '../store/actions'

function SongItems({ thumbnail, title, artists, releaseDate, sid, order, percent, style, sm }) {
    const dispatch = useDispatch()


    return (
        <div
            onClick={() => {
                dispatch(actions.setCurSongId(sid))
                dispatch(actions.play(true))
                dispatch(actions.setRecent({
                    thumbnail,
                    title, 
                    artists,
                    sid
                }))
            }}
            className={`w-full flex flex-auto p-[10px] justify-between items-center gap-[10px] rounded-md cursor-pointer ${style || 'text-black hover:bg-[#DDE4E4]'}`}
        >
            <div className='flex gap-4 items-center'>
                {order && <span>{order}</span>}
                <img src={thumbnail} alt="thumbnail" className={`${sm ? 'w-[40px] h-[40px]' : 'w-[60px] h-[60px]'} object-cover rounded-md`} />
                <div className='flex flex-col'>
                    <span className='text-sm font-semibold'>{title}</span>
                    <span className='text-xs opacity-70'>{artists}</span>
                    {releaseDate && <span className='text-xs text-gray-400'>{moment(releaseDate * 1000).fromNow()}</span>}
                </div>
            </div>

            {percent && <span className='font-bold'>{`${percent}%`}</span>}
        </div>
    )
}

export default memo(SongItems)