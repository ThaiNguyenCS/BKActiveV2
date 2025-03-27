declare type TooltipProps = {
    className?: string;
    content?: React.ReactNode;
    children?: React.ReactNode | string;
    placement?: "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end" | "right-start" | "right" | "right-end";
};