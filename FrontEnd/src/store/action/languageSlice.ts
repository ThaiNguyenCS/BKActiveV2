import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialLocale = (): 'en' | 'vi' | undefined => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    if (path.startsWith('/en')) { return 'en'; }
    if (path.startsWith('/vi')) { return 'vi'; }
};

const initialState: LanguageState = {
    locale: getInitialLocale(),
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguageVi: (state) => {
            state.locale = 'vi';
            localStorage?.setItem('locale', 'vi');
        },
        setLanguageEn: (state) => {
            state.locale = 'en';
            localStorage?.setItem('locale', 'en');
        },
        setLanguage: (state, action: PayloadAction<LocaleType>) => {
            state.locale = action.payload;
            localStorage.setItem('locale', action.payload);
        },
    },
});

export const { setLanguageVi, setLanguageEn, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;