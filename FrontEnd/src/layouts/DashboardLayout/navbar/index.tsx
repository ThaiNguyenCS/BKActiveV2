import Search from "./components/search";
import RouteInfo from "./components/routeInfo";
import ThemeSwitcher from "@/components/theme";
import LanguageSwitcher from "@/components/language";
import ToggleSidebar from "./components/toggleSidebar";
import Avatar from "./components/avatar";

const NavigationBar = () => {
    return (
        <nav className="sticky top-2 z-[45] flex flex-col md:flex-row md:justify-between h-fit w-full justify-start gap-4 md:gap-8 items-center rounded-xl p-2 backdrop-blur-xl dark:bg-darkContainer/20">
            <RouteInfo />

            <div className="relative mt-[3px] flex h-[61px] w-full flex-grow items-center justify-around gap-3 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 
            dark:!bg-[#242526] dark:shadow-none md:flex-grow-0 lg:w-[365px] xl:gap-2">
                <Search />

                <div className="flex gap-2.5 justify-center place-items-center">
                    <ToggleSidebar />

                    <div className="w-4 overflow-clip flex justify-center place-items-center">
                        <LanguageSwitcher version="3" />
                    </div>

                    <ThemeSwitcher version="2" />
                </div>

                <Avatar />
            </div>
        </nav>
    );
}

export default NavigationBar;