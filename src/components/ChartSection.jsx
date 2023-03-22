import React, { memo, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import _ from 'lodash'
import { Link } from 'react-router-dom';

import bgChart from '../asset/bg-chart.jpg'
import { SongItems } from './';
import path from '../ultis/path';
import icons from '../ultis/icons';

const {FaPlay} = icons
function ChartSection() {
    const chartRef = useRef()
    const [data, setData] = useState(null)
    const { chart, rank } = useSelector(state => state.app)
    const [tooltipState, setTooltipState] = useState({
        opacity: 0,
        top: 0,
        left: 0
    })

    const [selected, setSelected] = useState(null)
 
    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: 'rgba(255,255,255,0.1)', drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] }
            },

            x: {
                ticks: { color: 'white' },
                grid: { color: 'transparent' }
            }
        },
        plugins: {
            legend: false,
            tooltip: {
                enabled: false,
                external: ({ tooltip }) => {
                    if (!chartRef || !chartRef.current) return
                    if (tooltip.opacity === 0) {
                        if (tooltipState.opacity !== 0) setTooltipState(prev => ({ ...prev, opacity: 0 }))
                        return
                    }
                    const counters = []
                    for(let i =0; i<3; i++) {
                        counters.push({
                            data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),  
                            encodeId: Object.keys(chart?.items)[i]
                        })
                    }
                    const result = counters.find(i => i.data.some(n => n === +tooltip.body[0]?.lines[0]?.replace(',', '')*1000))
                    setSelected(result.encodeId)
                    const newTooltipData = {
                        opacity: 1,
                        left: tooltip.caretX,
                        top: tooltip.caretY
                    }

                    if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
                }
            }
        },
        hover: {
            mode: 'dataset',
            intersect: false
        }
    }
    useEffect(() => {
        const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
        const datasets = []
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                    borderColor: i === 0 ? 'blue' : i === 1 ? 'yellow' : 'red',
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: 'white',
                    pointHoverRadius: 4,
                    pointBorderColor: i === 0 ? 'blue' : i === 1 ? 'yellow' : 'red',
                    pointBorderHoverWidth: 4
                })
            }
            setData({ labels, datasets })
        }


    }, [chart])
    return (
        <div className='px-[59px] mt-12 relative max-h-[500px]'>
            <img src={bgChart} alt="khong co" className='w-full object-cover rounded-md max-h-[500px]' />
            <div className='absolute top-0 left-[59px] right-[59px] bottom-0 z-10 bg-[#73148ce6] rounded-md '></div>
            <div className='absolute top-0 left-[59px] right-[59px] bottom-0 z-20 p-5 flex flex-col'>
                <Link to={path.ZING_CHART} className='flex gap-2 items-center text-white hover:text-green-800' >
                    <h3 className='text-2xl font-bold '>#zingchart</h3>
                    <span className='p-2 rounded-full bg-white'><FaPlay size={15} color='green' /></span>
                </Link>
                <div className='flex gap-4 h-full'>
                    <div className='flex-3 flex flex-col gap-4'>
                        {rank?.filter((item, index) => index < 3)?.map((item, index) => (
                            <SongItems
                                key={item.encodeId}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                artists={item.artistsNames}
                                sid={item.encodeId}
                                order={index + 1}
                                percent={Math.round(+item.score * 100 / +chart?.totalScore)}
                                style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]'
                            />
                        ))}
                        <Link to={path.ZING_CHART} className='m-auto text-white px-4 py-2 rounded-l-full rounded-r-full border border-white w-fit'>Xem thêm</Link>
                    </div>
                    <div className='flex-7 h-full relative'>
                        {data && <Line data={data} ref={chartRef} options={options} />}
                        <div className='tooltip' style={{ top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: 'absolute' }}>
                            <SongItems
                                thumbnail={rank?.find(item => item.encodeId === selected)?.thumbnail}
                                title={rank?.find(item => item.encodeId === selected)?.title}
                                artists={rank?.find(item => item.encodeId === selected)?.artistsNames}
                                sid={rank?.find(item => item.encodeId === selected)?.encodeId}
                                style='bg-white'
                            />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default memo(ChartSection)