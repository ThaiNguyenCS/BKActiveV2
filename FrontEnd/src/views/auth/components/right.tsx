"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import bikeData from '../variable/lottie.json';
import { motion, useAnimation } from "framer-motion";
import { useTranslations } from "next-intl";
const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

const AuthRightContent = ({ isAnimated }: AuthRightContentProps) => {
    const intl = useTranslations("Login");
    const sectionRef = useRef(null);
    const control = useAnimation();

    return (
        <motion.div
            ref={sectionRef}
            initial="hidden"
            animate={control}
            className={`absolute top-0 hidden overflow-clip h-full bg-red-500 lg:block lg:w-[50%] xl:w-[55%] transition-all duration-1000
            ${isAnimated ? "left-[50%] xl:left-[45%] rounded-r-xl" : "left-0 rounded-l-xl"}`}
        >
            <div className="relative h-full w-full flex flex-col justify-between">
                <div
                    className={`text-white lg:text-3xl xl:text-4xl h-[7.5rem] transition-all duration-1000 w-full flex justify-center 
                    font-semibold place-items-center text-center ${isAnimated ? "pl-8 pr-48" : "pr-10 pl-48"}`}
                >
                    <div className="h-full flex place-items-center mt-4">{intl("Sologan")}</div>
                </div>

                <div
                    className={`w-full h-full grow flex justify-center place-items-end relative overflow-clip 
                    ${isAnimated ? "-scale-x-100" : ""}`}
                >
                    <div className="cloud dark:!bg-darkContainer" />
                    <Lottie animationData={bikeData} className="h-full w-full absolute bottom-0 left-0 xl:ml-[10%]" />
                </div>
            </div>
        </motion.div>
    );
}

export default AuthRightContent;