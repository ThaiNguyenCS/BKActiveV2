import { createSlice } from '@reduxjs/toolkit';

const initialState: ThemeState = {
    theme: 'dark',
};

const updateDOMTheme = (theme: ThemeType) => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';

    root.classList.remove(isDark ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('color-theme', theme);
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setLightTheme: (state) => {
            state.theme = 'light';
            updateDOMTheme('light');
        },
        setDarkTheme: (state) => {
            state.theme = 'dark';
            updateDOMTheme('dark');
        },
        loadThemeFromStorage: (state) => {
            const storedTheme = localStorage.getItem('color-theme') as ThemeType;
            if (storedTheme) {
                state.theme = storedTheme;
                updateDOMTheme(storedTheme);
            }
        },
    },
});

export const { setLightTheme, setDarkTheme, loadThemeFromStorage } = themeSlice.actions;
export default themeSlice.reducer;