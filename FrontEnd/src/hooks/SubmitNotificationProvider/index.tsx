import RenderCase from '@/components/render';
import SubmitNotification from '@/components/submitnotification';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

const submitNotificationReducer = (state: SubmitNotificationState, action: SubmitNotificationAction): SubmitNotificationState => {
    switch (action.type) {
        case 'ADD_NOTIFICATION': {
            return {
                ...state,
                openNotification: true,
                submitNotification: action.payload,
            };
        }
        case 'REMOVE_NOTIFICATION': {
            return {
                ...state,
                openNotification: false,
            };
        }
        default:
            return state;
    }
};

const SubmitNotificationContext = createContext<SubmitNotificationContextType | undefined>(undefined);

const initialState: SubmitNotificationState = {
    openNotification: false,
    submitNotification: undefined,
};

export const SubmitNotificationProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(submitNotificationReducer, initialState);

    const addSubmitNotification = (notification: SubmitNotificationUtility) => {
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    };

    const removeSubmitNotification = () => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
    };

    return (
        <SubmitNotificationContext.Provider value={{ state, addSubmitNotification, removeSubmitNotification }}>
            <RenderCase condition={state.openNotification}>
                <SubmitNotification />
            </RenderCase>
            {children}
        </SubmitNotificationContext.Provider>
    );
};

export const useSubmitNotification = () => {
    const context = useContext(SubmitNotificationContext);
    if (context === undefined) {
        throw new Error('useSubmitNotification must be used within a SubmitNotificationProvider');
    }
    return context;
};