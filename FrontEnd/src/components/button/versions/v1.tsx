import { Button } from "@nextui-org/react";

const CustomButtonV1 = ({ id, className, color, onClick, children, disabled = false }: ButtonVersionProps) => {
    return (
        <Button
            id={id}
            onPress={onClick}
            isDisabled={disabled}
            className={`rounded-md text-white z-0 overflow-clip
                ${color === "error" ? "bg-red-500 dark:bg-red-600"
                    : color === "blue" ? "bg-blue-500 dark:bg-blue-600"
                        : color === "success" ? "bg-green-500 dark:bg-green-600"
                            : color === "yellow" ? "bg-yellow-500 dark:bg-yellow-600"
                                : color === "orange" ? "bg-orange-500 dark:bg-orange-600"
                                    : color === "teal" ? "bg-teal-500 dark:bg-teal-600"
                                        : color === "lime" ? "bg-lime-500 dark:bg-lime-600"
                                            : color === "cyan" ? "bg-cyan-500 dark:bg-cyan-600"
                                                : color === "pink" ? "bg-pink-500 dark:bg-pink-600"
                                                    : color === "purple" ? "bg-purple-500 dark:bg-purple-600"
                                                        : color === "amber" ? "bg-amber-500 dark:bg-amber-600"
                                                            : color === "indigo" ? "bg-indigo-500 dark:bg-indigo-600"
                                                                : color === "gray" ? "bg-gray-500"
                                                                    : color === "brand" ? "bg-brand-500 dark:bg-brand-600"
                                                                        : "bg-utilsPrimary dark:bg-utilsPrimaryDark"
                } ${className}`}
        >
            {children}
        </Button>
    );
};

export default CustomButtonV1;