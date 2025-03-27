"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Dropdown from '@/components/dropdown';
import RenderCase from '@/components/render';
import Container from '@/components/container';
import SelectButtonV1 from './components/v1-btn';
import { removeDiacritics } from '@/utils/removeDiacritics';
import { MdClose, MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

const SelectInputV1 = ({
    options = [], value, setValue, messageIfEmptyOptions, state, position, dropdownPosition, inputClassName,
    placeholder, select_type = 'single', isClearable = true, id, className, disabled = false,
}: SelectInputProps) => {
    const InputFieldMessage = useTranslations('InputField');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [openWrapper, setOpenWrapper] = useState<boolean>(false);

    const filteredOptions = options.filter((option: SelectInputOptionFormat) =>
        removeDiacritics({ str: option.label.toLowerCase() }).includes(removeDiacritics({ str: searchTerm.toLowerCase() }))
    );

    const selectedLabel = !value ? null : (
        value.length
            ? options.filter((option: SelectInputOptionFormat) => value.includes(option.value)).map((option: SelectInputOptionFormat) => option.label).join(', ')
            : placeholder);

    return (
        <div className={`relative ${className}`} id={id}>
            <Dropdown
                disabled={disabled}
                openWrapper={openWrapper}
                setOpenWrapper={setOpenWrapper}
                maxWidth={true}
                position={position}
                dropdownPosition={dropdownPosition}
                button={
                    <SelectButtonV1
                        className={inputClassName}
                        disabled={disabled}
                        state={state}
                        isClearable={isClearable}
                        value={value}
                        setValue={setValue}
                        selectedLabel={selectedLabel}
                        placeholder={placeholder}
                        openWrapper={openWrapper}
                        setOpenWrapper={setOpenWrapper}
                        defaultSelectPlaceHolder={InputFieldMessage('DefaultSelectPlaceHolder')}
                    />
                }
                className="top-12 w-full"
            >
                <Container className="flex flex-col w-full bg-white dark:bg-darkContainerPrimary !rounded-md border dark:border-white/10">
                    <div className="relative p-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={InputFieldMessage('DefaultSelectSearchPlaceHolder')}
                            className="p-2 w-full text-left border rounded-md dark:bg-darkContainerPrimary dark:border-none focus:outline-none pr-10"
                            disabled={options.length === 0}
                        />
                        <RenderCase condition={!!searchTerm}>
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setSearchTerm('')}
                            >
                                <MdClose />
                            </button>
                        </RenderCase>
                    </div>

                    <div className="h-px w-full bg-gray-200 dark:bg-white/10" />

                    <div className='flex flex-col w-full max-h-32 overflow-y-scroll no-scrollbar'>
                        <RenderCase condition={filteredOptions.length > 0}>
                            {filteredOptions.map((option: SelectInputOptionFormat, index: number) => (
                                <div key={option.value.toString()}>
                                    <button
                                        onClick={() => {
                                            if (select_type === 'multi') {
                                                if (value.includes(option.value)) {
                                                    if (!isClearable && value.length === 1) {
                                                        return;
                                                    }
                                                    setValue(value.filter((v: string) => v !== option.value));
                                                } else {
                                                    setValue([...value, option.value]);
                                                }
                                            } else {
                                                setValue([option.value]);
                                            }
                                        }}
                                        className="p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 flex justify-between place-items-center w-full"
                                    >
                                        {option.label}

                                        <RenderCase condition={value && value.includes(option.value)}>
                                            <MdRadioButtonChecked className='w-4 h-4 min-w-4 min-h-4' />
                                        </RenderCase>

                                        <RenderCase condition={!value || !value.includes(option.value)}>
                                            <MdRadioButtonUnchecked className='w-4 h-4 min-w-4 min-h-4' />
                                        </RenderCase>
                                    </button>

                                    <RenderCase condition={index < filteredOptions.length - 1}>
                                        <div className="h-[0.5px] w-full bg-gray-200 dark:bg-white/10" />
                                    </RenderCase>
                                </div>
                            ))}
                        </RenderCase>
                    </div>

                    <RenderCase condition={filteredOptions.length === 0}>
                        <div className="p-2 text-gray-500 text-center flex justify-center place-items-center">{messageIfEmptyOptions || InputFieldMessage('DefaultSelectNoOptions')}</div>
                    </RenderCase>
                </Container>
            </Dropdown>
        </div>
    );
};

export default SelectInputV1;