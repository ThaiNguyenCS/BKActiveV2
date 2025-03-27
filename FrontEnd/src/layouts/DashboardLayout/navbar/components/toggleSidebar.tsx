"use client";

import { FiAlignJustify } from "react-icons/fi";
import { useSidebarContext } from "@/hooks/SidebarProvider";

const ToggleSidebar = () => {
    const { openSidebar, setOpenSidebar } = useSidebarContext();

    return (
        <span
            className="flex cursor-pointer text-xl text-gray-600 dark:text-white"
            onClick={() => { setOpenSidebar(!openSidebar) }}
        >
            <FiAlignJustify className="h-5 w-5" />
        </span>
    );
}

export default ToggleSidebar;