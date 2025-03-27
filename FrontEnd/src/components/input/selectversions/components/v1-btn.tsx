"use client";

import React from 'react';
import { MdClose } from 'react-icons/md';
import RenderCase from '@/components/render';
import { FaChevronDown } from 'react-icons/fa';

const SelectButtonV1 = ({
    className, disabled, state, isClearable, value, setValue, selectedLabel, placeholder, openWrapper, defaultSelectPlaceHolder,
}: SelectButtonProps) => (
    <button
        className={`p-2 px-3 text-left border rounded-md w-full dark:bg-darkContainerPrimary
                focus:outline-none flex justify-between place-items-center ${className}
                ${disabled
                ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                : state === 'error'
                    ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                    : state === 'success'
                        ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                        : ''}`}
        aria-haspopup="true"
        aria-expanded="false"
    >
        <p className="truncate">{selectedLabel || placeholder || defaultSelectPlaceHolder}</p>

        <RenderCase condition={isClearable && value?.length > 0}>
            <div
                className='-mr-0.5'
                onClick={(e) => {
                    e.stopPropagation();
                    setValue([]);
                }}
            >
                <MdClose />
            </div>
        </RenderCase>

        <RenderCase condition={!isClearable || !value || value.length === 0}>
            <FaChevronDown className={`ml-2 w-3 h-3 transition-all duration-300 ${openWrapper ? 'rotate-180' : ''}`} />
        </RenderCase>
    </button>
);

export default SelectButtonV1;