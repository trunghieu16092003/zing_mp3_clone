import moment from 'moment/moment'
import React, { memo } from 'react'
import icons from '../ultis/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'


const { BsMusicNoteBeamed } = icons


function ListItem({ songData }) {
  const dispatch = useDispatch()

  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId))
        dispatch(actions.play(true))
        dispatch(actions.playAlbum(true))
        dispatch(actions.setRecent({
          thumbnail: songData?.thumbnail,
          title: songData?.title,
          artists: songData?.artistsNames,
          sid: songData?.encodeId
        }))
      }}
      className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'>
      <div className='flex items-center gap-3 flex-1'>
        <span><BsMusicNoteBeamed /></span>
        <img src={songData?.thumbnail} alt="không có" className='w-10 h-10 object-cover border rounded-md' />
        <span className='flex flex-col w-full'>
          <span className='text-sm font-semibold'>{songData?.title?.length > 30 ? `${songData?.title?.slice(30)}...` : songData?.title}</span>
          <span>{songData?.artistsNames}</span>
        </span>
      </div>

      <div className='flex-1 flex items-center justify-center'>
        {songData?.album?.title}
      </div>

      <div className='flex-1 flex justify-end'>
        {moment.utc(songData?.duration * 1000).format('mm:ss')}
      </div>
    </div>
  )
}
export default memo(ListItem)