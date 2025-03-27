import { store } from "@/store";
import { useState } from "react";
import { BsGlobe } from 'react-icons/bs';
import Dropdown from "@/components/dropdown";
import RenderCase from "@/components/render";
import Container from "@/components/container";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const languages: LanguageButtonType[] = [
    { label: 'English', localeLabel: 'en' },
    { label: 'Vietnamese', localeLabel: 'vi' },
];

const LanguageSwitcherV3 = ({ handleSwitchLanguage }: LanguageVersionProps) => {
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const locale = store.getState().language.locale;

    const handleClick = () => {
        if (!dropdownOpen) { setDropdownOpen(true); };
    };

    return (
        <Dropdown
            animation="transition-all duration-300 ease-in-out"
            dropdownPosition="bottom"
            button={
                <button onClick={handleClick} className="uppercase h-12 w-12 flex justify-center place-items-center font-bold pt-[1px]">
                    <BsGlobe className="h-4 w-4 text-gray-600 dark:text-white" />
                </button>
            }
        >
            <Container className="!absolute !-right-[38px] top-1 flex min-w-32 w-32 !z-50 flex-col justify-start border dark:border-white/10 !rounded-md dark:text-white dark:shadow-none">
                {languages.map(({ label, localeLabel }, index) => (
                    <div key={localeLabel}>
                        <button
                            onClick={() => handleSwitchLanguage(localeLabel)}
                            className={`text-sm font-medium text-navy-700 dark:text-white place-items-center
                            hover:bg-gray-100 dark:hover:bg-gray-800 py-1 px-3 flex justify-between w-full
                            ${index === 0 ? 'rounded-t-md' : ''}
                            ${index === languages.length - 1 ? 'rounded-b-md' : ''}`}
                        >
                            {label}

                            <RenderCase condition={locale === localeLabel}>
                                <MdRadioButtonChecked />
                            </RenderCase>

                            <RenderCase condition={locale !== localeLabel}>
                                <MdRadioButtonUnchecked />
                            </RenderCase>
                        </button>
                    </div>
                ))}
            </Container>
        </Dropdown>
    );
};

export default LanguageSwitcherV3;