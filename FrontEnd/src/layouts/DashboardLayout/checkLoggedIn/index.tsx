"use client";

import { useEffect } from "react";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { fetchUserInfo } from "@/store/action/authSlice";
import { useDefaultNotification } from "@/hooks/DefaultNotificationProvider";

const CheckUserLoggedIn = () => {
    const router = useRouter();
    const intl = useTranslations("LoggedIn");
    const dispatch = useDispatch<AppDispatch>();
    const { addDefaultNotification } = useDefaultNotification();

    useEffect(() => {
        dispatch(fetchUserInfo())
            .then((data) => {
                if (fetchUserInfo.rejected.match(data)) {
                    addDefaultNotification({ message: intl("Message"), handleClose: () => { router.push("/") } });
                }
            });
    }, []);

    return (
        <></>
    );
}

export default CheckUserLoggedIn;