import Progress from '@/components/progress';

const NotificationContent = ({ type, message, progressWidth }: NotificationContentProps) => {
    const progressColor =
        type === 'success'
            ? 'green'
            : 'default';

    return (
        <div>
            <p className="text-sm text-gray-800 py-4 dark:text-white whitespace-pre-line">{message}</p>
            <Progress value={progressWidth} height='h-1' className='absolute bottom-0 right-0' bgColor="bg-none" color={progressColor} />
        </div>
    );
};

export default NotificationContent;