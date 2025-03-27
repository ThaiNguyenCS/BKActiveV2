import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './action/languageSlice';
import themeReducer from './action/themeSlice';
import authReducer from './action/authSlice';

export const store = configureStore({
    reducer: {
        language: languageReducer,
        theme: themeReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;