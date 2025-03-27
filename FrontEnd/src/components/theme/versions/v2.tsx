import RenderCase from "@/components/render";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

const ThemeSwitcherV2 = ({ checked, handleToggleTheme }: ThemeVersionProps) => {
    return (
        <div
            className="cursor-pointer text-gray-600"
            onClick={handleToggleTheme}
        >
            <RenderCase condition={checked}>
                <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
            </RenderCase>

            <RenderCase condition={!checked}>
                <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
            </RenderCase>
        </div>
    );
};

export default ThemeSwitcherV2;