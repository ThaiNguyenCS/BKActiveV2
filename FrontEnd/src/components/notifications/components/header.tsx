import RenderCase from '@/components/render';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { BiErrorCircle, BiInfoCircle } from 'react-icons/bi';

const NotificationHeader = ({ type, title }: NotificationHeaderProps) => {
    const textColor =
        type === 'success'
            ? 'text-green-600 dark:text-green-500'
            : type === 'error'
                ? 'text-red-600 dark:text-red-500'
                : 'text-gray-800 dark:text-white';

    return (
        <div className={`flex gap-2 justify-center place-items-center ${textColor}`}>
            <RenderCase condition={type === 'default'}>
                <BiInfoCircle />
            </RenderCase>

            <RenderCase condition={type === 'error'}>
                <BiErrorCircle />
            </RenderCase>

            <RenderCase condition={type === 'success'}>
                <IoCheckmarkCircle />
            </RenderCase>

            <h4 className="font-bold text-gray-800 dark:text-white">{title}</h4>
        </div>
    );
};

export default NotificationHeader;