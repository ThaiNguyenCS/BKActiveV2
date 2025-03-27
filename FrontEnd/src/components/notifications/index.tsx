"use client";

import Container from '../container';
import { MdClose } from 'react-icons/md';
import { Button } from '@nextui-org/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import NotificationContent from './components/main';
import NotificationHeader from './components/header';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '@/hooks/NotificationsProvider';

const MAX_NOTIFICATIONS = Number(process.env.NEXT_PUBLIC_MAX_NOTIFICATIONS) || 4;

const Notifications = () => {
    const { state, removeNotification } = useNotifications();
    const notifications = state.notifications;
    const [progresses, setProgresses] = useState<Record<string, number>>({});
    const NotificationIntl = useTranslations('Notification');

    const handleCloseNotification = (id: string, event?: React.MouseEvent) => {
        if (event) {
            event.stopPropagation();
        }
        removeNotification(id);
        setProgresses((prev) => {
            // eslint-disable-next-line
            const { [id]: _, ...rest } = prev;
            return rest;
        });
    };

    useEffect(() => {
        const timers: NodeJS.Timeout[] = [];

        notifications.forEach((notification) => {
            if (!(notification.id in progresses)) {
                setProgresses((prev) => ({ ...prev, [notification.id]: 5000 }));

                const timer = setTimeout(() => {
                    removeNotification(notification.id);
                    setProgresses((prev) => {
                        // eslint-disable-next-line
                        const { [notification.id]: _, ...rest } = prev;
                        return rest;
                    });
                }, 5000);
                timers.push(timer);
            }
        });

        return () => {
            timers.forEach((timer) => clearTimeout(timer));
        };
    }, [notifications, progresses, removeNotification]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgresses((prev) => {
                const newProgresses = { ...prev };
                Object.keys(newProgresses).forEach((id) => {
                    if (newProgresses[id] > 0) {
                        newProgresses[id] -= 100;
                    } else {
                        removeNotification(id);
                        delete newProgresses[id];
                    }
                });

                return newProgresses;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [removeNotification]);

    useEffect(() => {
        if (notifications.length > MAX_NOTIFICATIONS) {
            const oldestNotification = notifications[0];
            removeNotification(oldestNotification.id);
            setProgresses((prev) => {
                // eslint-disable-next-line
                const { [oldestNotification.id]: _, ...rest } = prev;
                return rest;
            });
        }
    }, [notifications, removeNotification]);

    return (
        <div className="fixed bottom-4 right-4 w-64 flex flex-col gap-4 z-[99]">
            <AnimatePresence>
                {notifications.slice().reverse().map((notification) => {
                    const progressWidth = (progresses[notification.id] || 0) / 5000 * 100;

                    const handleNotificationClick = () => {
                        if (notification.onClick) {
                            notification.onClick();
                        }
                    };

                    return (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }} layout
                            transition={{ animate: { duration: 0.7 }, exit: { duration: 0.2 } }}
                        >
                            <Button className='w-full h-full px-0 !rounded-md !shadow-md overflow-clip'
                                onClick={handleNotificationClick}
                            >
                                <Container
                                    className="p-2 px-3 relative !rounded-md cursor-pointer w-full"
                                >
                                    <div className="flex justify-between items-center">
                                        <NotificationHeader title={notification.title || NotificationIntl('DefaultTitle')} type={notification.type} />
                                        <div
                                            className="text-black hover:text-gray-500 dark:text-white"
                                            onClick={(e) => handleCloseNotification(notification.id, e)}
                                        >
                                            <MdClose />
                                        </div>
                                    </div>

                                    <NotificationContent type={notification.type} message={notification.message} progressWidth={progressWidth} />
                                </Container>
                            </Button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;