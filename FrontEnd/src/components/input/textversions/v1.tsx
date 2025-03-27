"use client";

import { MdClose } from "react-icons/md";
import { useTranslations } from "next-intl";
import RenderCase from "@/components/render";
import Dropdown from '@/components/dropdown';
import { formatDate } from "@/utils/formatDate";
import { parseDate } from "@internationalized/date";
import { Calendar, DateValue } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FiCalendar, FiEye, FiEyeOff } from "react-icons/fi";

const TextInputV1 = ({
    value, setValue, state, placeholder, isClearable = false, id, className, type, disabled = false, inputClassName, dropdownPosition
}: TextInputProps) => {

    const InputFieldMessage = useTranslations('InputField');
    const [isClient, setIsClient] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDateChange = async (date: DateValue) => {
        if (date) {
            const jsDate = new Date(date.year, date.month - 1, date.day);
            const formattedDate = formatDate({ date: jsDate });
            setValue(formattedDate);
            setShowCalendar(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string, setValue: (_value: string) => void, blur?: boolean) => {
        const inputValue = e.target.value;
        if (type === "date" && inputValue.split('-')[0]?.length > 4) {
            const parts = inputValue.split('-');
            parts[0] = parts[0].substring(0, 4);
            setValue(parts.reverse().join('/'));
        } else if (!blur) {
            setValue(inputValue);
        }
    };

    const validateDate = () => {
        if (value === '') { return; };
        try {
            const parsedDate = parseDate(value.split('/').reverse().join('-'));
            if (!parsedDate) {
                throw new Error('Invalid date format');
            }
        } catch {
            throw new Error(`Invalid date format: ${value} \nThe initial date value must either be an empty string or follow the format 'dd/mm/yyyy' (replace d, m, and y with numbers).`);
        };
    };

    if (type === 'date') {
        validateDate();
    };

    const triggerButton = () => {
        return (
            <>
                <RenderCase condition={type !== 'text-area'}>
                    <input
                        id={id}
                        disabled={disabled}
                        onChange={(e) => handleInputChange(e, type, setValue)}
                        type={type === "password" && showPassword ? "text" : type}
                        onBlur={(e) => handleInputChange(e, type, setValue, true)}
                        value={type === "date" ? value.split('/').reverse().join('-') : value}
                        placeholder={type === "date" ? "" : (placeholder ? placeholder : disabled ? "" : InputFieldMessage('DefaultTextPlaceHolder'))}
                        className={`p-2 px-3 text-left border rounded-md w-full dark:bg-darkContainerPrimary
                        focus:outline-none flex hide-calendar-icon no-spin-button
                        ${inputClassName}
                        ${disabled
                                ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                                : state === "error"
                                    ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                                    : state === "success"
                                        ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                        : ""
                            } `}
                    />
                </RenderCase>

                <RenderCase condition={type === 'text-area'}>
                    <textarea
                        id={id}
                        rows={6}
                        value={value}
                        disabled={disabled}
                        onChange={(e) => { setValue(e.target.value); }}
                        placeholder={type === "date" ? "" : (placeholder ? placeholder : disabled ? "" : InputFieldMessage('DefaultTextPlaceHolder'))}
                        className={`p-2 px-3 min-h-12 text-left border rounded-lg w-full dark:bg-darkContainerPrimary
                        focus:outline-none flex justify-between hide-calendar-icon
                        ${inputClassName}
                        ${disabled
                                ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                                : state === "error"
                                    ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                                    : state === "success"
                                        ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                        : ""
                            } `}
                    />
                </RenderCase>

                <RenderCase condition={type === "password"}>
                    <button
                        onClick={togglePasswordVisibility}
                        className={`absolute top-1/2 right-2.5 transform -translate-y-1/2 focus:outline-none
                            ${state === "error" ? "text-red-500 dark:!text-red-400"
                                : state === "success" ? "text-green-500 dark:!text-green-400" : ""}`}
                    >
                        <RenderCase condition={showPassword}>
                            <FiEyeOff />
                        </RenderCase>

                        <RenderCase condition={!showPassword}>
                            <FiEye />
                        </RenderCase>
                    </button>
                </RenderCase>

                <RenderCase condition={isClearable && !!value && isClient && type !== 'date' && type !== 'password' && type !== 'text-area'}>
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        onClick={(e) => { e.stopPropagation(); setValue(''); }}
                    >
                        <MdClose />
                    </button>
                </RenderCase>

                <RenderCase condition={type === "date"}>
                    <FiCalendar className="absolute top-1/2 right-2.5 transform -translate-y-1/2 focus:outline-none text-black dark:text-white" />
                </RenderCase>
            </>
        );
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className={`relative ${className}`}>
            <RenderCase condition={type !== "date"}>
                {triggerButton()}
            </RenderCase>

            <RenderCase condition={type === "date"}>
                <Dropdown
                    dropdownPosition={dropdownPosition}
                    maxWidth={true}
                    button={triggerButton()}
                    className="top-12 w-full"
                    openWrapper={showCalendar}
                    setOpenWrapper={setShowCalendar}
                    disabled={disabled || type !== "date"}
                >
                    <RenderCase condition={type === "date"}>
                        <Calendar
                            showMonthAndYearPickers
                            onChange={handleDateChange}
                            value={value && type === "date" ? parseDate(value.split('/').reverse().join('-')) : null}
                            defaultValue={value && type === "date" ? parseDate(value.split('/').reverse().join('-')) : null}
                            classNames={{
                                content: "w-full absolute",
                                header: "bg-white dark:bg-darkContainerPrimary",
                                base: "w-full justify-center flex bg-white dark:bg-darkContainerPrimary border dark:border-white/10 !rounded-md shadow-none no-scrollbar relative",
                            }}
                        />
                    </RenderCase>
                </Dropdown>
            </RenderCase>
        </div>
    );
};

export default TextInputV1;