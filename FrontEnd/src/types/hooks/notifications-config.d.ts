declare type NotificationsAction =
    | { type: 'ADD_NOTIFICATION'; payload: Omit<NotificationUtility, 'id'> }
    | { type: 'REMOVE_NOTIFICATION'; payload: string };

declare type NotificationUtility = {
    id: string;
    title?: string;
    message: string;
    type: NotificationTypes;
    onClick?: () => void;
};

declare type NotificationsState = {
    notifications: NotificationUtility[];
};

declare type NotificationsContextType = {
    state: NotificationsState;
    addNotification: (_notification: Omit<NotificationUtility, 'id'>) => void;
    removeNotification: (_id: string) => void;
};

declare type NotificationTypes = 'default' | 'error' | 'success';