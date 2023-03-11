import actionTypes from "./actionType";
import * as apis from "../../apis"


export const setCurSongId =  (songId) => ({
    type: actionTypes.SET_CUR_SONG_ID,
    songId
})

export const play =  (flag) => ({
    type: actionTypes.PLAY,
    flag
})