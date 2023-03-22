import React from "react";
import { useSelector } from 'react-redux'


import { Slider, Section, NewRelease, ChartSection } from "../../components";

const Home = () => {
    const { friday, top100, seasonTheme, weekChart, favouriteArtist } = useSelector(state => state.app)

    return (
        <div className="overflow-y-auto">
            <Slider /> 
            <NewRelease />
            <Section data={friday} />
            <Section data={favouriteArtist} />
            <ChartSection />
            <Section data={top100} />
        </div>
    )
}

export default Home