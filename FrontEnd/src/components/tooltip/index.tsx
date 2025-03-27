import { Tooltip } from "@nextui-org/react";
// Nếu muốn custom thêm: vào https://nextui.org/docs/components/tooltip và bổ sung props
const TooltipHorizon = ({ className, children, content, placement }: TooltipProps) => {
    return (
        <Tooltip
            content={content}
            placement={placement}
            className={`w-max text-sm dark:shadow-none w-50 p-0 ${className}`}
        >
            {children}
        </Tooltip>
    );
};

export default TooltipHorizon;