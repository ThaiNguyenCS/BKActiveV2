"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import useRoutes from "../../sidebar/variable/route";

const RouteInfo = () => {
    const routes = useRoutes();
    const pathname = usePathname();
    const intl = useTranslations("Routes")
    const [activeRoute, setActiveRoute] = useState<string | undefined>(undefined);

    const getPathWithoutLocale = (pathname: string) => {
        const parts = pathname.split('/');

        const localePattern = /^[a-z]{2}$/;
        if (localePattern.test(parts[1])) {
            return parts.slice(2).join('/');
        }
        return pathname;
    };

    useEffect(() => {
        const findActiveRouteIndex = () => {
            const cleanPathname = getPathWithoutLocale(pathname);
            return routes.findIndex(route => route.layout && route.path && cleanPathname === route.path);
        };
        setActiveRoute(routes[findActiveRouteIndex()].path);
    }, [pathname, routes]);

    return (
        <div className="ml-[6px] w-full md:w-fit whitespace-nowrap">
            <div className="h-6 w-full pt-1 text-left">
                <Link
                    className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                    href=" "
                >
                    {intl("home")}
                    <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                        {" "}
                        /{" "}
                    </span>
                </Link>
                <Link
                    className="text-sm font-bold text-navy-700 hover:underline dark:text-white dark:hover:text-white whitespace-nowrap"
                    href="#"
                >
                    {activeRoute ? intl(activeRoute) : "..."}
                </Link>
            </div>
            <p className="shrink text-[33px] text-navy-700 dark:text-white">
                <Link
                    href="#"
                    className="font-bold hover:text-navy-700 dark:hover:text-white whitespace-nowrap hidden md:block"
                >
                    {activeRoute ? intl(activeRoute) : "..."}
                </Link>
            </p>
        </div>
    );
}

export default RouteInfo;