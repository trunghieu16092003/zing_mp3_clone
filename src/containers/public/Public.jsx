import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";

const Public = () => {
    const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)
    return (
        <div className="w-full relative flex flex-col h-screen bg-[#CED9D9]">
            <div className="w-full h-full flex flex-auto ">
                <div className="w-[240px] flex-none border">
                    <SidebarLeft />
                </div>
                <div className="flex-auto border-red-500">
                    <div className="h-[70px] px-[59px] flex items-center w-full">
                        <Header />
                    </div>
                    <div className="flex-auto w-full">
                        <Scrollbars autoHide style={{ width: '100%', height: 500 }}>
                            <Outlet />
                        </Scrollbars>
                    </div>

                </div>
                {
                    isShowRightSidebar &&
                    <div className="w-[329px] hidden 1300:flex h-screen flex-none animate-slide-left">
                        <SidebarRight />
                    </div>
                }

            </div>
            <div className="fixed bottom-0 left-0 right-0 h-[90px]">
                <Player setIsShowRightSidebar={setIsShowRightSidebar} />
            </div>
        </div>
    )
}

export default Public