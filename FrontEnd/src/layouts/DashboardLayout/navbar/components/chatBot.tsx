"use client";

import { RootState } from "@/store";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";
import DetailPopup from "@/components/popup";
import LoadingUI from "@/components/loading";
import { useState, useEffect, useRef } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { Button } from "@nextui-org/react";

type Props = {
    setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
    chatHistory: { sender: "user" | "bot"; message: string }[];
    setChatHistory: React.Dispatch<React.SetStateAction<{ sender: "user" | "bot"; message: string }[]>>;
};

const AIChatBot = ({ setOpenChat, chatHistory, setChatHistory }: Props) => {
    const intl = useTranslations("Navbar");
    const containerRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const locale = useSelector((state: RootState) => state.language.locale);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const sendMessage = async () => {
        if (!message.trim() || isLoading) return;

        setIsLoading(true);
        setChatHistory((prev) => [...prev, { sender: "user", message }]);
        setMessage("");

        try {
            const res = await fetch("https://api.cohere.ai/v1/chat", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "command-r-plus",
                    message,
                    locale,
                }),
            });

            const data = await res.json();

            if (data.text) {
                setChatHistory((prev) => [...prev, { sender: "bot", message: data.text }]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <DetailPopup
            customWidth="w-full md:w-[500px]"
            title={intl("Search")}
            onClose={() => setOpenChat(false)}
            icon={<IoSparklesOutline className="h-4 w-4" />}
            noPadding
        >
            <div className="relative flex flex-col p-2 max-h-[calc(100dvh-56px)] min-h-[300px] gap-2">
                <div className="flex-1 overflow-y-auto overflow-x-clip p-4 space-y-2">
                    {chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`px-3 py-2 max-w-[75%] rounded-lg dark:text-white ${chat.sender === "user" ? "bg-red-500 text-white" : "text-navy-700 bg-lightPrimary dark:bg-darkContainerPrimary"}`}>
                                <div className="overflow-x-auto">{chat.sender === "bot" ? (
                                    <ReactMarkdown>{chat.message}</ReactMarkdown>
                                ) : (
                                    chat.message
                                )}</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>

                <div
                    ref={containerRef}
                    onKeyDown={handleKeyDown}
                    onClick={() => setIsSearchFocused(true)}
                    className={`relative flex h-10 min-h-10 items-center rounded-lg bg-lightPrimary text-navy-700 dark:bg-darkContainerPrimary dark:text-white w-full`}
                >
                    <motion.div
                        className="absolute text-xl transition-all duration-500 transform"
                        initial={{ left: 2 }}
                        animate={{ left: isSearchFocused ? "calc(100% - 2rem - 6px)" : "4px", }}
                    >
                        <Button className={`${isSearchFocused ? "bg-red-500 dark:bg-darkContainer shadow-sm" : ""} h-8 w-8 px-2 flex justify-center rounded-lg place-items-center min-w-0 min-h-0`}>
                            {isLoading ? <LoadingUI /> : <FiSearch className={`h-4 w-4 dark:text-white ${isSearchFocused ? "text-white" : "text-gray-400"}`} />}
                        </Button>
                    </motion.div>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder={intl("Search2")}
                        className={`block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-[#3a3b3c]
                        dark:text-white dark:placeholder:!text-white transition-all duration-500 ${isSearchFocused ? "pl-4" : "pl-10"} pr-12`}
                    />
                </div>
            </div>
        </DetailPopup>
    );
};

export default AIChatBot;