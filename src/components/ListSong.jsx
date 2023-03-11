import React, { memo } from 'react'
import { ListItem } from './'

function ListSong({ songs, totalDuration }) {
    return (
        <div className='w-full flex flex-col text-xs text-gray-600'>
            <div className='flex justify-between items-center p-[10px] font-semi'>
                <span>BÀI HÁT</span>
                <span>ALBUM</span>
                <span>THỜI GIAN</span>
            </div>
            <div>
                {songs?.map(item => (
                    <ListItem key={item.encodeId} songData={item} />
                ))}
            </div>

        </div>
    )
}
export default memo(ListSong)