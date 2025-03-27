'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const breakpoints = {
    xs: 400,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1320,
    '3xl': 1600,
    '4xl': 1850,
};

const ScreenViewContext = createContext<ScreenViewState | undefined>(undefined);

export const ScreenViewProvider = ({ children }: { children: ReactNode }) => {
    const [screenViewState, setScreenViewState] = useState<ScreenViewState>({
        windowWidth: 0,
        isXS: false,
        isSM: false,
        isMD: false,
        isLG: false,
        isXL: false,
        is2XL: false,
        is3XL: false,
        is4XL: false,
    });

    const handleWindowSizeChange = () => {
        const width = window.innerWidth;
        setScreenViewState({
            windowWidth: width,
            isXS: width <= breakpoints.xs,
            isSM: width <= breakpoints.sm,
            isMD: width <= breakpoints.md,
            isLG: width <= breakpoints.lg,
            isXL: width <= breakpoints.xl,
            is2XL: width <= breakpoints['2xl'],
            is3XL: width <= breakpoints['3xl'],
            is4XL: width <= breakpoints['4xl'],
        });
    };

    useEffect(() => {
        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);
        return () => window.removeEventListener('resize', handleWindowSizeChange);
    }, []);

    return (
        <ScreenViewContext.Provider value={screenViewState}>
            {children}
        </ScreenViewContext.Provider>
    );
};

export const useScreenView = () => {
    const context = useContext(ScreenViewContext);
    if (!context) {
        throw new Error('useScreenView must be used within a ScreenViewProvider');
    }
    return context;
};