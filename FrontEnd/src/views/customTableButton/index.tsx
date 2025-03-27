"use client";

import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import RenderCase from "@/components/render";
import { MdRestartAlt, MdOutlineAddCircleOutline, MdOutlineRemoveCircleOutline } from "react-icons/md";

interface CustomButtonProps {
    fetchData: () => void;
    selectedRows?: unknown[];
    openAdd?: () => void;
    handleDelete?: () => void;
    extraButton?: React.ReactNode;
}

const CustomButton = ({ fetchData, selectedRows, openAdd, handleDelete, extraButton }: CustomButtonProps) => {
    const intl = useTranslations("TableCustomButton")
    return (
        <>
            {extraButton}
            <div className="grid grid-cols-2 lg:flex gap-3 h-full place-items-center w-full lg:w-fit">
                <Button className={`${!openAdd && !handleDelete ? "col-span-2" : " col-span-1"} w-full lg:w-fit flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 hover:bg-gray-100 dark:bg-darkContainerPrimary dark:hover:bg-white/20 dark:active:bg-white/10
          linear justify-center rounded-lg font-medium dark:font-base transition duration-200`}
                    onPress={fetchData}>
                    <MdRestartAlt />{intl("Reload")}
                </Button>
                <RenderCase condition={!!openAdd}>
                    <Button className={`col-span-1 w-full lg:w-fit flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 hover:bg-gray-100 dark:bg-darkContainerPrimary dark:hover:bg-white/20 dark:active:bg-white/10
                linear justify-center rounded-lg font-medium dark:font-base transition duration-200`}
                        onPress={openAdd}
                    >
                        <MdOutlineAddCircleOutline /><p className="flex gap-1">{intl("Add")}</p>
                    </Button>
                </RenderCase>
                <RenderCase condition={!!selectedRows && !!handleDelete}>
                    <Button className={`${openAdd && selectedRows && handleDelete ? "col-span-2" : " col-span-1"} w-full lg:w-fit flex items-center text-md hover:cursor-pointer bg-lightPrimary p-2 text-red-500 hover:bg-gray-100 dark:bg-darkContainerPrimary dark:hover:bg-white/20 dark:active:bg-white/10
          linear justify-center rounded-lg font-medium dark:font-base transition duration-200`}
                        onPress={handleDelete}>
                        <MdOutlineRemoveCircleOutline />{intl("Delete")} ({selectedRows?.length})
                    </Button>
                </RenderCase>
            </div>
        </>
    );
};

export default CustomButton;