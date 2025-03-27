"use client";

import { useState } from "react";
import { RootState } from "@/store";
import InfoContent from "./userInfo";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/dropdown";
import DetailPopup from "@/components/popup";
import RenderCase from "@/components/render";
import { FaUserCircle } from "react-icons/fa";
import Container from "@/components/container";
import { logout } from "@/store/action/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";

const Avatar = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const intl = useTranslations("Navbar");
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const [openInfo, setOpenInfo] = useState<boolean>(false);
    // const [openPass, setOpenPass] = useState<boolean>(false);
    const { addSubmitNotification } = useSubmitNotification();

    const handleLogout = () => {
        addSubmitNotification({ message: intl("LogoutMessage"), submitClick: handleLogoutLogic })
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
    };

    const handleLogoutLogic = () => {
        dispatch(logout());
        router.push("/");
    };

    return (
        <>
            <RenderCase condition={openInfo}>
                <DetailPopup onClose={handleCloseInfo} title={intl("InfoTitle")}
                    customWidth="w-fit"
                    icon={<FaUserCircle className="w-full h-full" />}>
                    <div className="p-2 flex flex-col gap-2">
                        <InfoContent />
                    </div>
                </DetailPopup>
            </RenderCase>

            <Dropdown
                button={
                    <div className="avatar w-10 h-10 rounded-full">
                        <img
                            src="/avatar.jpg"
                            alt="avatar"
                            width={19200}
                            height={10800}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                }
            >
                <Container className="!absolute -right-1 top-2 flex w-52 flex-col justify-start shadow-xl shadow-shadow-500 dark:text-white dark:shadow-none">
                    <div className="p-3.5">
                        <div className="flex items-center flex-col gap-.5">
                            <p className="text-sm font-normal text-navy-700 dark:text-white w-full text-center">
                                {intl("Login")}
                            </p>
                            <p className="text-sm font-bold text-navy-700 dark:text-white text-center w-full overflow-hidden">
                                {userInfo?.username}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col pb-3 px-3 -mt-4">
                        <button
                            onClick={() => { setOpenInfo(true) }}
                            className="mt-3 text-sm font-medium text-navy-700 dark:text-white"
                        >
                            {intl("ViewInfo")}
                        </button>
                    </div>

                    {/* <div className="flex flex-col pb-3 px-3 -mt-2">
                        <button
                            onClick={() => { setOpenPass(true) }}
                            className="mt-3 text-sm font-medium text-navy-700 dark:text-white"
                        >
                            {intl("ChangePass")}
                        </button>
                    </div> */}

                    <div className="h-[0.5px] w-full bg-gray-200 dark:bg-white/20" />

                    <div className="flex flex-col pb-3 px-3">
                        <button
                            onClick={handleLogout}
                            className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                        >
                            {intl("Logout")}
                        </button>
                    </div>
                </Container>
            </Dropdown>
        </>
    );
}

export default Avatar;