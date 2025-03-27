import { store } from "@/store";
import { useState } from "react";
import Dropdown from "@/components/dropdown";
import RenderCase from "@/components/render";
import Container from "@/components/container";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

const languages: LanguageButtonType[] = [
    { label: 'English', localeLabel: 'en' },
    { label: 'Vietnamese', localeLabel: 'vi' },
];

const LanguageSwitcherV1 = ({ handleSwitchLanguage }: LanguageVersionProps) => {
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
                <button onClick={handleClick} className="text-blue-500 uppercase h-5 w-5 border-2
                rounded-md flex justify-center place-items-center font-bold text-xs pt-[1px] border-blue-500">
                    {locale}
                </button>
            }
            className={"py-2 top-8"}
        >
            <Container className="!absolute !-right-4 flex min-w-32 w-32 !z-50 flex-col justify-start border dark:border-white/10 !rounded-md dark:text-white dark:shadow-none">
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

                        {index < languages.length - 1 && (
                            <div className="h-px w-full bg-gray-200 dark:bg-white/10" />
                        )}
                    </div>
                ))}
            </Container>
        </Dropdown>
    );
};

export default LanguageSwitcherV1;