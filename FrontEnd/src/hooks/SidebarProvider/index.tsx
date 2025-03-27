'use client';
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';

export const SidebarContext = createContext({} as SidebarContextInterface);

export default function SidebarProvider({ children }: { children: ReactNode }) {
    const [openSidebar, setOpenSidebar] = useState<boolean>(true);

    useEffect(() => {
        window.addEventListener("resize", () =>
            setOpenSidebar(false)
        );

        return () => {
            window.removeEventListener('resize', () => { });
        }
    }, []);

    return (
        <SidebarContext.Provider
            value={{
                openSidebar, setOpenSidebar,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebarContext() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSideBarContext must be used within a SideBarProvider');
    }
    return context;
}