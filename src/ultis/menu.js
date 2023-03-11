import icons from './icons'

const { MdOutlineLibraryMusic,
        FiDisc,
        TbChartArcs,
         MdOutlineFeed } = icons
export const SidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <MdOutlineLibraryMusic size={24} />
    },

    {
        path: '',
        text: 'Khám phá',
        end: true,
        icon: <FiDisc size={24} />
    },

    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <TbChartArcs size={24} />
    },

    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <MdOutlineFeed size={24} />
    },
]