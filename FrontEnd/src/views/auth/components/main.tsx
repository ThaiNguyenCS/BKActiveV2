"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import AuthRightContent from "./right";
import AuthLeftContent from "./left";

const AuthMain = () => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
        setIsAnimated(true);
        return () => {
            setIsAnimated(false);
        };
    }, []);

    return (
        <>
            <div className={`ribbon hidden z-20 lg:block absolute bg-white transition-all shadow-3xl duration-1000 ${isAnimated ? "-top-2 right-4 -scale-x-100" : "-top-2 right-[calc(100%-152px)]"}`}>
                <div className={`w-28 h-28 flex place-items-center transition-all duration-1000 pt-2 ${isAnimated ? "-scale-x-100" : ""}`}>
                    <Image src="/Logo.png" alt="Your image" width={250} height={250} />
                </div>
            </div>
            <AuthLeftContent isAnimated={isAnimated} />
            <AuthRightContent isAnimated={isAnimated} />
        </>
    );
}

export default AuthMain;