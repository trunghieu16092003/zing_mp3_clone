import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";

const Public = () => {
    return (
        <div className="w-full flex flex-col min-h-screen bg-[#CED9D9]">
            <div className="w-full h-full flex flex-auto">
                <div className="w-[240px]  flex-none border border-blue-500">
                    <SidebarLeft />
                </div>
                <div className="flex-auto border-red-500">
                    <div className="h-[70px] px-[59px] flex items-center w-full mb-5">
                        <Header />
                    </div>
                    <Outlet />

                </div>
                <div className="w-[329px] hidden 1300:flex flex-none border-green-500 animate-slide-left">
                    <SidebarRight />
                </div>
            </div>
            <div className="flex-none h-[90px]">
                <Player />
            </div>
        </div>
    )
}

export default Public