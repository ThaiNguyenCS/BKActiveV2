"use client";

import { useState } from "react";
import RenderCase from "../render";
import { IoIosArrowUp } from "react-icons/io";

export default function CollapsibleSection({ trigger, children, initialValue = true }: CollapsibleSectionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(initialValue);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <>
            <RenderCase condition={typeof trigger === "string"}>
                <button
                    onClick={toggleOpen}
                    className="text-left flex text-lg justify-start gap-2 items-center p-0 bg-transparent rounded-md font-semibold"
                >
                    <IoIosArrowUp className={`w-4 h-4 transition-all duration-500 ${isOpen ? "rotate-180" : "rotate-90"}`} /> {trigger}
                </button>
            </RenderCase>

            <RenderCase condition={!(typeof trigger === "string")}>
                <div onClick={toggleOpen}>
                    {trigger}
                </div>
            </RenderCase>
            <div
                className={`overflow-hidden transition-all duration-500 transform flex flex-col ${isOpen ? "max-h-dvh w-fit min-w-full opacity-100" : "max-h-0 opacity-0"}`}
            >
                {children}
            </div>
        </>
    );
}