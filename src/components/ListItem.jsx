import React, { memo } from 'react'
import icons from '../ultis/icons'

const {BsMusicNoteBeamed} = icons

function ListItem({songData}) {
  return (
    <div className='flex justify-between items-center p-[10px]'>
        <div className='flex items-center gap-3 flex-1'>
            <span><BsMusicNoteBeamed /></span>
            <img src={songData?.thumbnail} alt="không có" className='w-10 h-10 object-cover border rounded-md' />
            <span className='flex flex-col w-full'>
                <span className='text-sm font-semibold'>{songData?.title?.length > 30 ? `${ songData?.title?.slice(30)}...`: songData?.title}</span>
                <span>{songData?.artistsNames}</span>
            </span>
        </div>

        <div className='flex-1 flex items-center justify-center'>
            {songData?.album?.title}
        </div>

        <div className='flex-1 flex justify-end'>

        </div>
    </div>
  )
}
export default memo(ListItem)