declare type ButtonVersion = '1';

declare type ButtonProps = {
    version?: ButtonVersion;
    id?: string;
    color?: "default" | "error" | "blue" | "success" | "yellow" | "orange" | "teal" | "lime" | "cyan" | "pink" | "purple" | "amber" | "indigo" | "gray" | "brand";
    className?: string;
    onClick?: (_e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode | string;
    disabled?: boolean;
};

declare type ButtonVersionProps = {
    id?: string;
    color?: "default" | "error" | "blue" | "success" | "yellow" | "orange" | "teal" | "lime" | "cyan" | "pink" | "purple" | "amber" | "indigo" | "gray" | "brand";
    className?: string;
    onClick?: (_e?: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement> | PressEvent) => void;
    children?: React.ReactNode | string;
    disabled?: boolean;
};