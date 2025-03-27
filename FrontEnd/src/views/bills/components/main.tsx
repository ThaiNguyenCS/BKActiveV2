"use client";

import CustomButton from "@/components/button";
import Container from "@/components/container"
import CustomInputField from "@/components/input";
import LoadingUI from "@/components/loading";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { IoReloadOutline } from "react-icons/io5";

type BillsFields = {
    id: keyof BillData,
    type: InputTypes,
    important?: boolean,
    version?: TextInputVersion | SelectInputVersion,
    select_type?: SelectInputType,
    options?: SelectInputOptionFormat[],
    isClearable?: boolean,
    state?: InputState,
    dropdownPosition?: DropdownPosition;
}

const BillsMain = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const billTypeData: BillsType[] = ["INVOICE", "RECEIPT", "OTHER"];
    const intl = useTranslations("BillsRoute");

    const billTypeOptions: SelectInputOptionFormat[] = billTypeData.map(type => ({
        label: intl(type),
        value: type
    }));

    const [billInfo, setBillInfo] = useState<BillData>({
        amount: "0",
        note: "",
        type: ["INVOICE"]
    });

    const updateValue = (id: keyof BillData, value: string | string[]) => {
        setBillInfo(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const billsFields: Array<BillsFields> = [
        { id: "type", type: "select", select_type: "multi", isClearable: false, options: billTypeOptions, important: true },
        { id: "amount", type: "text", important: true },
        { id: "note", type: "text-area", important: true },
    ];

    const handleReload = () => {
        if (loading) { return; };
        setBillInfo({
            amount: "0",
            note: "",
            type: ["INVOICE"]
        })
    }

    return (
        <Container className="w-full h-full p-4 gap-4 flex flex-col relative">
            <div className="w-full h-full gap-4 flex flex-col relative">
                {billsFields.map(({ id, type, version, isClearable, options, select_type, state, important, dropdownPosition }: BillsFields) => (
                    <CustomInputField
                        id={id}
                        key={id}
                        type={type}
                        value={billInfo[id]}
                        setValue={(value: string | string[]) => updateValue(id, value)}
                        version={version}
                        options={options}
                        select_type={select_type}
                        isClearable={isClearable}
                        dropdownPosition={dropdownPosition}
                        className="w-full"
                        inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-h-[250px]"
                        label={
                            <div className='flex gap-1 place-items-center relative mb-2'>
                                {intl(id)} {important && <div className="text-red-500">*</div>}
                            </div>
                        } />
                ))}
            </div>

            <Container className="!sticky bottom-0 w-full !rounded-none flex gap-1.5">
                <CustomButton
                    version="1"
                    color="error"
                    onClick={handleReload}
                    className="linear !min-w-10 !w-10 !px-0 rounded-md bg-lightContainer dark:!bg-darkContainer border border-red-500 dark:!border-red-500 h-10 text-base font-medium transition duration-200 hover:border-red-600 
                            active:border-red-700 text-red-500 dark:text-white dark:hover:border-red-400 dark:active:border-red-300 flex justify-center place-items-center"
                >
                    <IoReloadOutline />
                </CustomButton>
                <CustomButton
                    version="1"
                    color="error"
                    // onClick={handleSubmit}
                    className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                            active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                >
                    {loading ? <LoadingUI /> : intl("Submit")}
                </CustomButton>
            </Container>
        </Container>
    );
}

export default BillsMain;