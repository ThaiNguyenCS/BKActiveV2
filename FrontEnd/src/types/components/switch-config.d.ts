declare type SwitchProps = {
    id?: string;
    color?: "default" | "red" | "blue" | "green" | "yellow" | "orange" | "teal" | "lime" | "cyan" | "pink" | "purple" | "amber" | "indigo" | "gray" | "brand";
    className?: string;
    checked?: boolean;
    onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
};