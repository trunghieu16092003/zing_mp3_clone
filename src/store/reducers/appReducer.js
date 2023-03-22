import actionTypes from "../actions/actionType"

const initState = {
    banner: [],
    friday: {},
    top100: {},
    seasonTheme: {},
    newRelease: {},
    weekChart: [],
    favouriteArtist: {}, 
    chart : {}, 
    rank: []
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
          
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === "hSlider")?.items || null,
                friday: action.homeData?.find(item => item.sectionId === "hAutoTheme1") || {},
                top100: action.homeData?.find(item => item.sectionId === "h100") || {},
                seasonTheme: action.homeData?.find(item => item.sectionId === "hSeasonTheme") || {},
                newRelease: action.homeData?.find(item => item.sectionType === "new-release") || {},
                weekChart: action.homeData?.find(item => item.sectionType === "weekChart")?.items || [],
                favouriteArtist: action.homeData?.find(item => item.sectionId === "hArtistTheme") || {},
                chart: action.homeData?.find(item => item.sectionId === "hZC")?.chart || {},
                rank: action.homeData?.find(item => item.sectionId === "hZC")?.items || [],
            }
        default:
            return state
    }
}

export default appReducer