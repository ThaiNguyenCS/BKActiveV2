declare type SubmitNotificationAction =
    | { type: 'ADD_NOTIFICATION'; payload: SubmitNotificationUtility }
    | { type: 'REMOVE_NOTIFICATION' };

declare type SubmitNotificationUtility = {
    title?: string;
    message?: string;
    children?: React.ReactNode;
    submitClick?: (() => void) | (() => Promise<void>);
};

declare type SubmitNotificationState = {
    submitNotification: SubmitNotificationUtility | undefined;
    openNotification: boolean;
};

declare type SubmitNotificationContextType = {
    state: SubmitNotificationState;
    addSubmitNotification: (_notification: SubmitNotificationUtility) => void;
    removeSubmitNotification: () => void;
};