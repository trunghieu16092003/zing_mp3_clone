import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import * as apis from '../../apis'
import moment from 'moment';
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions'
import { AudioLoading, ListSong } from '../../components';
import icons from '../../ultis/icons';

const { FaPlay } = icons

function Album() {
  const location = useLocation()

  const {isPlaying} = useSelector(state => state.music)
  const { pid } = useParams()
  const [playlistData, setPlaylistData] = useState({})
  const dispatch = useDispatch()


  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid)
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data)
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
      }
    }

    fetchDetailPlaylist()
  }, [pid])

  useEffect(() => {
    dispatch(actions.setCurAlbumId(pid))
    if(location.state?.playAlbum) {
      const randomSong = Math.round(Math.random() * playlistData?.song?.items?.length) - 1
      dispatch(actions.setCurSongId(playlistData?.song?.items[randomSong]?.encodeId))
      dispatch(actions.play(true))
    }
  }, [pid, playlistData])

  return (
    <div className='flex gap-8 w-full px-[59px]'>
      <div className='flex-none w-1/4 borde flex flex-col items-center gap-2'>
        <div className='w-full relative'>
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnail"
            className={`w-full object-contain ${isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-md animate-rotate-center-pause'} shadow-md`}
          />
          <div className={
            `absolute top-0 left-0 bottom-0 right-0 
          hover:bg-[rgba(0,0,0,0.3)] text-white flex items-center justify-center
          ${isPlaying && 'rounded-full'}
          `
          }
          >
            <span className='p-3 border border-white rounded-full'>{isPlaying ? <AudioLoading /> : <FaPlay size={24} />}</span>
          </div>
        </div>

        <h3 className='text-[20px] font-bold text-gray-800'>{playlistData?.title}</h3>
        <span className='flex items-center gap-2 text-gray-500 text-xs'>
          <span>Cập nhật:</span>
          <span>
            {moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}
          </span>
        </span>
        <span className='flex items-center gap-2 text-gray-500 text-xs'>{playlistData?.artistsNames}</span>
        <span className='flex items-center gap-2 text-gray-500 text-xs'>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>

      </div>
      <Scrollbars style={{ width: '100%', height: 550 }}>
        <div className='flex-auto mb-40'>
          <div>
            <span className='text-gray-600 text-[14px] '>Lời tựa  </span>
            <span>{playlistData?.sortDescription}</span>
          </div>
          <ListSong totalDuration={playlistData?.song?.totalDuration} />
        </div>
      </Scrollbars>

    </div >
  )
}

export default Album