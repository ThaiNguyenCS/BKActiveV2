"use client";

import Link from "next/link";
import useRoutes from "../variable/route";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import DashIcon from "@/components/icons/DashIcon";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  onClickRoute?: (e: MouseEvent<HTMLElement>) => void;
};

const SidebarLinks = ({ onClickRoute }: Props) => {
  const routes = useRoutes();
  const pathname = usePathname();
  const intl = useTranslations("Routes");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number } | null>(null);
  const routeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sidebarRef = useRef<HTMLUListElement | null>(null);

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
    setActiveIndex(findActiveRouteIndex());
  }, [pathname, routes]);

  useEffect(() => {
    if (activeIndex !== null && routeRefs.current[activeIndex] && sidebarRef.current) {
      const activeRoute = routeRefs.current[activeIndex];
      if (activeRoute) {
        const parentTop = sidebarRef.current.offsetTop;
        setIndicatorStyle({
          top: activeRoute.offsetTop - parentTop + 12,
          height: activeRoute.offsetHeight,
        });
      }
    }
  }, [activeIndex]);

  const handleRouteClick = (index: number, e: React.MouseEvent<HTMLElement>) => {
    setActiveIndex(index);
    onClickRoute && onClickRoute(e);
  };

  const createLinks = (routes: any) => {
    const employeeRoute = routes.filter((route: { path: string }) => ["bills", "bills_history"].includes(route.path));
    const managerRoute = routes.filter((route: { path: string }) => ["pending_bills"].includes(route.path));
    const financialManagerRoute = routes.filter((route: { path: string }) => ["pending_bills"].includes(route.path));

    const renderLinks = (routes: any, startIndex: number, headerText: string) => (
      <div>
        <p className="font-semibold mb-2 pl-5 pt-2">{headerText}</p>
        {routes.map((route: any, index: number) => {
          const routeIndex = index + startIndex;
          return (
            <Link key={`route-${routeIndex}`} href={route.path} onClick={(e) => handleRouteClick(routeIndex, e)}>
              <div
                ref={(el) => {
                  routeRefs.current[routeIndex] = el;
                }}
                className="relative mb-3 flex hover:cursor-pointer"
              >
                <li className="my-[3px] flex cursor-pointer items-center px-8">
                  <span className={`${activeIndex === routeIndex ? "font-bold text-red-500 dark:text-white" : "font-medium text-gray-400"}`}>
                    {route.icon ? route.icon : <DashIcon />}{" "}
                  </span>
                  <p className={`leading-1 ml-4 flex ${activeIndex === routeIndex ? "font-medium text-red-500 dark:text-white" : "font-medium text-gray-400"}`}>
                    {route.name}
                  </p>
                </li>
              </div>
            </Link>
          );
        })}
      </div>
    );

    return (
      <ul ref={sidebarRef} className="relative">
        {renderLinks(employeeRoute, 0, intl("EmployeeRoute"))}
        {renderLinks(managerRoute, 2, intl("ManagerRoute"))}
        {renderLinks(financialManagerRoute, 3, intl("FinancialManagerRoute"))}
        {indicatorStyle && (
          <motion.div
            className="absolute right-0 w-1 rounded-lg bg-red-500 dark:bg-red-500"
            animate={{ top: indicatorStyle.top, height: indicatorStyle.height }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </ul>
    );
  };

  return createLinks(routes);
};

export default SidebarLinks;