import Notifications from "@/components/notifications";
import { generateNotificationId } from '@/utils/generateRandomId';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

const notificationsReducer = (state: NotificationsState, action: NotificationsAction): NotificationsState => {
    switch (action.type) {
        case 'ADD_NOTIFICATION': {
            const newNotification: NotificationUtility = {
                ...action.payload,
                id: generateNotificationId(),
            };
            return {
                ...state,
                notifications: [...state.notifications, newNotification],
            };
        }
        case 'REMOVE_NOTIFICATION': {
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.id !== action.payload
                ),
            };
        }
        default:
            return state;
    }
};

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

const initialState: NotificationsState = {
    notifications: [],
};

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(notificationsReducer, initialState);

    const addNotification = (notification: Omit<NotificationUtility, 'id'>) => {
        dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    };

    const removeNotification = (id: string) => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    };

    return (
        <NotificationsContext.Provider value={{ state, addNotification, removeNotification }}>
            <Notifications />
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationsProvider');
    }
    return context;
};