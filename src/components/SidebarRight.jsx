import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SongItems } from './'
import { Scrollbars } from 'react-custom-scrollbars-2'

import icons from '../ultis/icons'
import { apiGetDetailPlaylist } from '../apis'

const { ImBin } = icons

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false)
  const [playlist, setPlaylist] = useState(null)
  const { curSongData, curAlbumId, isPlaying, recentSongs, curSongId } = useSelector(state => state.music)

  const fetchDetailPlaylist = async () => {
    const response = await apiGetDetailPlaylist(curAlbumId)
    if (response.data?.err === 0) {
      setPlaylist(response.data.data?.song?.items)
    }
  }

  useEffect(() => {
    curAlbumId && fetchDetailPlaylist()
  })

  useEffect(() => {
    if (curAlbumId && isPlaying) {
      fetchDetailPlaylist()
    }
  }, [curAlbumId, isPlaying])

  useEffect(() => {
    isPlaying && setIsRecent(false)
  }, [isPlaying, curSongId])

  
  return (
    <div className='flex flex-col text-xs w-full h-full'>
      <div className='h-[70px] w-full flex-none py-[14px] px-2 gap-8 flex items-center justify-between'>
        <div className='flex flex-auto justify-center bg-[#dde4e4] rounded-l-full rounded-r-full py-[6px] px-[5px] cursor-pointer'>
          <span
            onClick={() => setIsRecent(prev => !prev)}
            className={`py-[5px] ${!isRecent && 'flex flex-1 bg-[#e7ecec] justify-center rounded-l-full rounded-r-full items-center'}`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent(prev => !prev)}
            className={`py-[5px] ${isRecent && 'flex flex-1 bg-[#e7ecec] justify-center rounded-l-full rounded-r-full items-center'}`}
          >
            Nghe gần đây
          </span>
        </div>
        <span
          className='p-1 rounded-full hover:bg-[#dde4e4] cursor-pointer'><ImBin size={14} /></span>
      </div>


      {isRecent ?
        <div className="w-full flex flex-col flex-auto px-2 text-white">
          <Scrollbars style={{ width: '100%', height: 570 }}>
            {recentSongs &&
              <div className='flex flex-col flex-auto'>
                {recentSongs?.map(item => (
                  <SongItems
                    key={item.sid}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artists}
                    sid={item?.sid}
                    sm
                  />
                ))}
              </div>
            }
          </Scrollbars>
        </div> : <div className="w-full flex flex-col flex-auto px-2 text-white">
          <Scrollbars style={{ width: '100%', height: 570 }}>
            <SongItems
              thumbnail={curSongData?.thumbnail}
              title={curSongData?.title}
              artists={curSongData.artistsNames}
              sid={curSongData?.encodeId}
              sm
              style='bg-[#0e8080] text-white'
            />
            <div className='flex flex-col text-black pt-[15px] pb-[5px]'>
              <span className=' text-sm font-bold'>Tiếp theo</span>
              <span className='opacity-70 text-xs flex gap-1'>
                <span>Từ playlist</span>
                <span className='font-semibold text-[#0e8080]'>{curSongData?.album.title}</span>
              </span>
            </div>

            {playlist &&
              <div className='flex flex-col flex-auto'>
                {playlist?.map(item => (
                  <SongItems
                    key={item.encodeId}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artistsNames}
                    sid={item?.encodeId}
                    sm
                  />
                ))}
              </div>
            }
          </Scrollbars>
        </div>}
    </div>
  )
}

export default SidebarRight