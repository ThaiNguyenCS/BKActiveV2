declare type ClickOutsideAlerterProps = {
    ref: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[];
    setState?: React.Dispatch<React.SetStateAction<boolean>>;
    action?: () => void;
};