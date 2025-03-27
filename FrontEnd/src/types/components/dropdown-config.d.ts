declare type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';

declare type DropdownProps = {
    position?: string;
    className?: string;
    animation?: string;
    disabled?: boolean;
    maxWidth?: boolean;
    openWrapper?: boolean;
    button?: React.ReactNode;
    children?: React.ReactNode;
    dropdownPosition?: DropdownPosition;
    setOpenWrapper?: React.Dispatch<React.SetStateAction<boolean>>;
};

declare type DropdownPositionState = {
    top: number | undefined;
    left: number | undefined;
}