import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import moment from 'moment'

import * as apis from '../apis'
import icons from '../ultis/icons'

const { AiFillHeart, AiOutlineHeart, BsThreeDots, CiRepeat,
    MdSkipNext,
    MdSkipPrevious,
    CiShuffle, FaPlay,
    FaPause, TbRepeatOnce, BsMusicNoteList, SlVolume2, SlVolumeOff } = icons

var intervalId

const Player = ({ setIsShowRightSidebar }) => {

    const [audio, setAudio] = useState(new Audio())
    const [songInfo, setSongInfo] = useState(null)
    const [curSecond, setCurSecond] = useState(0)
    const [isShuffle, setIsShuffle] = useState(false)
    const [repeatMode, setRepeatMode] = useState(0)
    const [volume, setVolume] = useState(100)
    const { curSongId, isPlaying, songs } = useSelector(state => state.music)
    const dispatch = useDispatch()
    const thumbRef = useRef()
    const trackRef = useRef()

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])

            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
                dispatch(actions.setCurSongData(res1.data.data))
            }

            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            } else {
                audio.pause()
                setAudio(new Audio())
                dispatch(actions.play(false))
                alert(res2?.data?.msg)
                setCurSecond(0)
                thumbRef.current.style.cssText = `right: 100%`
            }
        }

        fetchDetailSong()
    }, [curSongId])

    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.pause()
        audio.load()
        audio.currentTime = 0
        if (isPlaying && thumbRef.current) {
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`
                setCurSecond(Math.round(audio.currentTime))
            }, 200)
        } else {

        }

    }, [audio])

    useEffect(() => {
        const handleEnded = () => {
            if (isShuffle === true) {
                handleShuffle()
            } else if (repeatMode) {
                repeatMode === 1 ? handleRepeatOne() : handleNextSong()
            } else {
                audio.pause()
                dispatch(actions.play(false))
            }
        }
        audio.addEventListener('ended', handleEnded)

        return () => {
            audio.removeEventListener('ended', handleEnded)
        }
    }, [audio, isShuffle, repeatMode])

    useEffect(() => {
        audio.volume = volume / 100
    }, [volume])

    const handleTogglePlay = async () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        } else {
            audio.play()
            dispatch(actions.play(true))
        }
    }

    const handleClickProgressbar = (e) => {
        const coordinates = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - coordinates.left) * 10000 / coordinates.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        audio.currentTime = percent * songInfo.duration / 100
        setCurSecond(Math.round(audio.currentTime))
    }

    //node next
    const handleNextSong = () => {
        if (songs) {
            let currentSongIndex;
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    currentSongIndex = index
                }

            })
            dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispatch(actions.play(true))
        }

    }

    //node prev
    const handlePrevSong = () => {
        if (songs) {
            let currentSongIndex;
            songs?.forEach((item, index) => {
                if (item.encodeId === curSongId) {
                    currentSongIndex = index
                }
            })
            dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispatch(actions.play(true))
        }
    }

    const handleShuffle = () => {
        const randomIndex = Math.round(Math.random() * songs?.length) - 1
        dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
        dispatch(actions.play(true))

    }

    const handleRepeatOne = () => {
        audio.play()
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
                    <span
                        onClick={() => setIsShuffle(prev => !prev)}
                        className={`cursor-pointer ${isShuffle && 'text-purple-600'}`}>
                        <CiShuffle size={24} />
                    </span>
                    <span
                        onClick={handlePrevSong}
                        className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}><MdSkipPrevious size={24} /></span>
                    <span
                        onClick={handleTogglePlay}
                        className='p-2 border border-gray-700 rounded-full cursor-pointer'>
                        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                    </span>
                    <span
                        onClick={handleNextSong}
                        className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`}><MdSkipNext size={24} /></span>
                    <span
                        className={`cursor-pointer ${repeatMode && 'text-purple-600'}`}
                        onClick={() => setRepeatMode(prev => prev === 2 ? 0 : prev + 1
                        )}
                    >
                        {repeatMode === 1 ? <TbRepeatOnce size={24} /> : <CiRepeat size={24} />}
                    </span>
                </div>

                <div className='w-full flex items-center justify-center gap-2'>
                    <span>{moment.utc(curSecond * 1000).format('mm:ss')}</span>
                    <div
                        onClick={handleClickProgressbar}
                        className='w-3/4 m-auto relative h-[3px] bg-[rgba(0,0,0,0.1)] hover:h-[8px] cursor-pointer'
                        ref={trackRef}
                    >
                        <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 bg-[#0e8080]'></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className='w-[30%] flex-auto flex items-center justify-end gap-4'>
                <div className='flex gap-2 items-center'>
                    <span onClick={() => setVolume(prev => prev === 0 ? 70 : 0)}>{volume > 0 ? <SlVolume2/> : <SlVolumeOff />}</span>
                    <input
                        type="range"
                        step={1}
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                    />
                    <span onClick={() => setIsShowRightSidebar(prev => !prev)} className='p-1 rounded-sm bg-[#0e8080] hover:opacity-100 cursor-pointer'><BsMusicNoteList /></span>
                </div>

            </div>
        </div>
    )
}

export default Player