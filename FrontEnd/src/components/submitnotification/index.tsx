"use client";

import ReactDOM from "react-dom";
import RenderCase from "../render";
import LoadingUI from "../loading";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useHandleClickOutsideAlerter } from "@/utils/handleClickOutside";
import { useSubmitNotification } from "@/hooks/SubmitNotificationProvider";

const SubmitNotification = () => {
    const { state, removeSubmitNotification } = useSubmitNotification();
    const notificationRef = useRef<HTMLDivElement>(null);
    const { submitNotification, openNotification } = state;
    const [loading, setLoading] = useState<boolean>(false);
    const NotificationIntl = useTranslations('Notification');
    const [isVisible, setIsVisible] = useState<boolean>(true);

    const handleAnimationComplete = () => {
        if (!isVisible) {
            removeSubmitNotification();
        }
    };

    const handleClose = (event?: React.MouseEvent<HTMLButtonElement>) => {
        if (event) {
            event.preventDefault();
        }
        setIsVisible(false);
    };

    const handleSubmitClick = async () => {
        if (submitNotification?.submitClick) {
            setLoading(true);
            await submitNotification.submitClick();
            setLoading(false);
            handleClose();
        }
    };

    useHandleClickOutsideAlerter({ ref: notificationRef, action: handleClose });
    if (!openNotification || !submitNotification) { return null; };

    return ReactDOM.createPortal(
        <motion.div
            className="fixed top-0 left-0 right-0 bottom-0 flex backdrop-blur-sm
            items-center justify-center bg-[#000000] dark:bg-white/30 bg-opacity-50 z-[100] inset-0 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={handleAnimationComplete}
        >
            <motion.div
                ref={notificationRef}
                className="relative min-w-full sm:min-w-[300px] sm:max-w-dvw
                max-h-[80vh] bg-white dark:bg-[#242526] rounded-xl p-4 flex flex-col shadow"
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-[#000000] dark:text-gray-500 text-xl font-bold mb-2 text-center">
                    {submitNotification.title || NotificationIntl('DefaultTitle')}
                </h2>

                <div className="overflow-scroll max-h-full w-full no-scrollbar">
                    <p className="text-[#000000] dark:text-white w-full text-center">
                        {submitNotification.message || submitNotification.children}
                    </p>
                </div>

                <div className="flex w-full justify-between gap-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 px-4 py-2 truncate h-10 rounded-md overflow-clip
                        text-black border border-gray-300 dark:text-gray-300 hover:cursor-pointer flex"
                        onClick={handleClose}
                    >
                        {NotificationIntl('DefaultCloseButton')}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 px-4 py-2 truncate h-10 rounded-md overflow-clip
                        text-white hover:cursor-pointer flex bg-utilsPrimary"
                        onClick={handleSubmitClick}
                    >
                        <RenderCase condition={!loading}>
                            {NotificationIntl('DefaultSubmitButton')}
                        </RenderCase>

                        <RenderCase condition={loading}>
                            <LoadingUI />
                        </RenderCase>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
};

export default SubmitNotification;