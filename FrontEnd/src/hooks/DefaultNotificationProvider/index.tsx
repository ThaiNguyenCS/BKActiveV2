import DefaultNotification from '@/components/defaultnotification';
import RenderCase from '@/components/render';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

const defaultNotificationReducer = (state: DefaultNotificationState, action: DefaultNotificationAction): DefaultNotificationState => {
    switch (action.type) {
        case 'ADD_NOTIFICATION': {
            return {
                ...state,
                openDefaultNotification: true,
                defaultNotification: action.payload,
            };
        }
        case 'REMOVE_NOTIFICATION': {
            return {
                ...state,
                openDefaultNotification: false,
            };
        }
        default:
            return state;
    }
};

const DefaultNotificationContext = createContext<DefaultNotificationContextType | undefined>(undefined);

const initialState: DefaultNotificationState = {
    openDefaultNotification: false,
    defaultNotification: undefined,
};

export const DefaultNotificationProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(defaultNotificationReducer, initialState);

    const addDefaultNotification = (notification: DefaultNotificationUtility) => {
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    };

    const removeDefaultNotification = () => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
    };

    return (
        <DefaultNotificationContext.Provider value={{ state, addDefaultNotification, removeDefaultNotification }}>
            <RenderCase condition={state.openDefaultNotification}>
                <DefaultNotification />
            </RenderCase>
            {children}
        </DefaultNotificationContext.Provider>
    );
};

export const useDefaultNotification = () => {
    const context = useContext(DefaultNotificationContext);
    if (context === undefined) {
        throw new Error('useDefaultNotification must be used within a DefaultNotificationProvider');
    }
    return context;
};