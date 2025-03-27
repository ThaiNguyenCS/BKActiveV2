import { createPortal } from 'react-dom';
import { debounce } from '@/utils/debounce';
import { useState, useRef, useEffect } from 'react';
import { useHandleClickOutsideAlerter } from '@/utils/handleClickOutside';

const Dropdown = ({
    button, children, className, animation, position, maxWidth, dropdownPosition = 'bottom',
    disabled = false, openWrapper: parentOpenWrapper, setOpenWrapper: parentSetOpenWrapper,
}: DropdownProps) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [localOpenWrapper, setLocalOpenWrapper] = useState<boolean>(false);
    const [dropdownPositionState, setDropdownPositionState] = useState<DropdownPositionState>({ top: undefined, left: undefined });
    const [isClient, setIsClient] = useState(false);

    const dropdownPositionClasses = {
        top: `${position ? position : 'origin-bottom'}`,
        bottom: `${position ? position : 'origin-top'}`,
        left: `${position ? position : 'origin-top-right'}`,
        right: `${position ? position : 'origin-top-left'}`,
    }[dropdownPosition];

    const openWrapper = parentOpenWrapper !== undefined ? parentOpenWrapper : localOpenWrapper;
    const setOpenWrapper = parentSetOpenWrapper ?? setLocalOpenWrapper;

    const handleOnMouseDown = () => {
        if (!disabled) {
            setOpenWrapper(!openWrapper);
        }
    };

    useHandleClickOutsideAlerter({ ref: [wrapperRef, dropdownRef], setState: setOpenWrapper });

    const setDropdownPosition = () => {
        if (buttonRef.current) {
            const button = buttonRef.current as HTMLElement;
            const buttonRect = button.getBoundingClientRect();
            let top: number | undefined = 0;
            let left: number | undefined = 0;

            switch (dropdownPosition) {
                case 'top':
                    top = dropdownRef.current ? buttonRect.top - dropdownRef.current.clientHeight - 8 : undefined;
                    left = buttonRect.left;
                    break;
                case 'bottom':
                    top = buttonRect.bottom + 8;
                    left = buttonRect.left;
                    break;
                case 'left':
                    top = buttonRect.top;
                    left = wrapperRef.current ? buttonRect.left - wrapperRef.current?.clientWidth - 8 : undefined;
                    break;
                case 'right':
                    top = buttonRect.top;
                    left = buttonRect.right + 8;
                    break;
                default:
                    top = buttonRect.bottom;
                    left = buttonRect.left;
                    break;
            }
            setDropdownPositionState({ top, left });
        }
    };

    const debouncedSetDropdownPosition = debounce(setDropdownPosition, 100);

    useEffect(() => {
        setIsClient(true);

        debouncedSetDropdownPosition();

        const handleResize = () => {
            debouncedSetDropdownPosition();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dropdownPosition, debouncedSetDropdownPosition]);

    useEffect(() => {
        debouncedSetDropdownPosition();
    }, [buttonRef, debouncedSetDropdownPosition]);

    useEffect(() => {
        if (!dropdownRef.current || !openWrapper) return;

        const dropdownBounds = dropdownRef.current.getBoundingClientRect();
        const isOutOfBounds =
            dropdownBounds.top < 0 ||
            dropdownBounds.left < 0 ||
            dropdownBounds.right > window.innerWidth ||
            dropdownBounds.bottom > window.innerHeight;

        if (isOutOfBounds) {
            setOpenWrapper(false);
        }
    }, [dropdownPositionState, openWrapper]);

    return (
        <div ref={wrapperRef} className={`relative flex ${maxWidth ? 'w-full' : ''}`}>
            <div ref={buttonRef} className={`flex ${maxWidth ? 'w-full' : ''}`} onMouseDown={handleOnMouseDown}>
                {button}
            </div>

            {isClient && createPortal(
                <div
                    ref={dropdownRef}
                    className={`z-50 ${className} ${dropdownPositionClasses}
                    ${animation ? animation : 'transition-all duration-300 ease-in-out'}
                    ${openWrapper && dropdownPositionState.top && dropdownPositionState.left ? 'scale-100' : 'scale-0'}`}
                    style={{
                        width: buttonRef.current?.getBoundingClientRect().width,
                        position: 'fixed',
                        top: dropdownPositionState.top,
                        left: dropdownPositionState.left,
                    }}
                >
                    <div className='relative w-full'>
                        {children}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Dropdown;