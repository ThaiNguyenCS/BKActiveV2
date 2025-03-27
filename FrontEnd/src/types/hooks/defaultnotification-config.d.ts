declare type DefaultNotificationAction =
    | { type: 'ADD_NOTIFICATION'; payload: DefaultNotificationUtility }
    | { type: 'REMOVE_NOTIFICATION' };

declare type DefaultNotificationUtility = {
    title?: string;
    message?: string;
    children?: React.ReactNode;
    handleClose?: () => void;
};

declare type DefaultNotificationState = {
    defaultNotification: DefaultNotificationUtility | undefined;
    openDefaultNotification: boolean;
};

declare type DefaultNotificationContextType = {
    state: DefaultNotificationState;
    addDefaultNotification: (_notification: DefaultNotificationUtility) => void;
    removeDefaultNotification: () => void;
};