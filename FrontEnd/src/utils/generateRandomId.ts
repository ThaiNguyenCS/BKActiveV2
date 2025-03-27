export const generateNotificationId = (): string => {
    return new Date().getTime().toString();
};