"use client";

import { useState } from "react";
import AIChatBot from "./chatBot";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import RenderCase from "@/components/render";
import { IoSparklesOutline } from "react-icons/io5";

const Search = () => {
    const intl = useTranslations("Navbar");
    const [search, setSearch] = useState<string>("");
    const [openChat, setOpenChat] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<{ sender: "user" | "bot"; message: string }[]>([{ sender: "bot", message: intl("FirstMessage") }]);

    return (
        <Button
            onPress={() => setOpenChat(true)}
            className={`relative flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-darkContainerPrimary dark:text-white w-full`}
        >
            <RenderCase condition={openChat}>
                <AIChatBot chatHistory={chatHistory} setChatHistory={setChatHistory} setOpenChat={setOpenChat} />
            </RenderCase>
            <motion.p
                className={`absolute text-xl h-8 w-8 px-2 flex justify-center rounded-full place-items-center transition-all duration-500 bg-lightContainer dark:bg-darkContainer shadow-sm transform`}
                initial={{ left: 2 }}
                animate={{ left: "calc(100% - 2rem - 6px)" }}
            >
                <IoSparklesOutline className="ml-0.5 h-3.5 w-3.5 text-navy-700 dark:text-white" />
            </motion.p>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder={intl("Search")}
                disabled
                className={`block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none
                placeholder:!text-navy-700 dark:bg-darkContainerPrimary dark:text-white dark:placeholder:!text-white transition-all duration-500 pl-2`}
            />
        </Button>
    );
}

export default Search;