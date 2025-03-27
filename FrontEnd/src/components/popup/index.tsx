"use client";

import ReactDOM from "react-dom";
import RenderCase from "../render";
import Container from "../container";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";

const DetailPopup = ({ onClose, children, title, className, customWidth, icon, noPadding, triggerClose = false, setTriggerClose }: PopupProps) => {
    const notificationRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        if (setTriggerClose) setTriggerClose(false);
        setIsVisible(false);
    };

    const handleAnimationComplete = () => {
        if (!isVisible) {
            onClose();
        }
    };

    useEffect(() => {
        if (triggerClose) handleClose();
    }, [triggerClose])

    return ReactDOM.createPortal(
        <motion.div
            className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#000000]
            bg-opacity-10 dark:bg-white dark:bg-opacity-5 z-50 p-2 max-h-dvh h-dvh`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backdropFilter: "blur(6px)",
            }}
            onAnimationComplete={handleAnimationComplete}
        >
            <motion.div
                ref={notificationRef}
                className="relative w-full max-h-full flex flex-col justify-center items-center overflow-auto"
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Container className={`!rounded-lg overflow-clip ${customWidth ? customWidth : "sm:w-9/12"}`}>
                    <div className="max-h-10 bg-white dark:bg-[#242526] h-10 grid grid-cols-2 md:grid-cols-3 place-items-center px-2 rounded-t-md">
                        <div className="text-[#000000] dark:text-white flex justify-start gap-2 w-full">
                            <RenderCase condition={!!icon}>
                                <div className="min-h-5 min-w-5 flex justify-center place-items-center">{icon}</div>
                            </RenderCase>
                            <div className="md:hidden text-md font-semibold text-black dark:text-white whitespace-nowrap truncate">
                                {title}
                            </div>
                        </div>

                        <div className="hidden md:block text-md font-semibold text-black dark:text-white whitespace-nowrap">
                            {title}
                        </div>

                        <div className="flex flex-row-reverse gap-3 justify-start w-full">
                            <button
                                onClick={handleClose}
                                className="linear w-6 h-6 rounded-full text-base dark:text-white transition duration-200 flex justify-center
                                place-items-center hover:bg-utilsPrimary hover:dark:bg-gray-200 hover:text-white hover:dark:text-black"
                            >
                                <MdClose className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className={`overflow-y-auto max-h-[calc(100dvh-56px)] min-h-20 rounded-b-sm no-scrollbar
                        ${noPadding ? '' : 'px-2 pb-2'}`}>
                        <div className={`w-full h-full ${className} rounded-b-sm`}>
                            {children}
                        </div>
                    </div>
                </Container>
            </motion.div>
        </motion.div>,
        document.body
    );
};

export default DetailPopup;