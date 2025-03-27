"use client";

import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { useCallback, useEffect, useState } from "react";
import { columnsData } from "../variables/columnsData";
import { IoCheckmark } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { Button } from "@nextui-org/react";
import RenderCase from "@/components/render";
import DetailPopup from "@/components/popup";
import { FaQuestionCircle } from "react-icons/fa";
import CustomInputField from "@/components/input";
import Container from "@/components/container";
import CustomButton2 from "@/components/button";
import LoadingUI from "@/components/loading";

const PendingBillsHistoryMain = () => {
    const intl = useTranslations("BillsRoute");
    const [bills, setBills] = useState<BillRecord[]>();
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [openReason, setOpenReason] = useState<boolean>(false);
    const [selectedRows, setSelectedRows] = useState<BillRecord[]>([]);
    const [reason, setReason] = useState<'reject' | 'approve'>('reject');
    const renderHeader = (cellHeader: string): string => {
        if (cellHeader == intl("action")) {
            return "pl-5 !text-center"
        }
        return "";
    };

    const renderCell = (cellHeader: string, cellValue: string | number | boolean | unknown) => {
        if (cellHeader === intl("Status")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {intl(cellValue)}
                </div>
            );
        } else if (cellHeader === intl("type")) {
            return (
                <div className="w-full h-full whitespace-nowrap">
                    {Array.isArray(cellValue) ? cellValue.map(item => intl(item)).join(', ') : intl(cellValue)}
                </div>
            );
        } else if (cellHeader === intl("action")) {
            return (
                <div className="flex justify-center place-items-center w-full gap-2">
                    <Button className="min-h-5 min-w-5 w-5 h-5 rounded-full bg-lightContainer dark:!bg-darkContainer border p-1 border-green-500" onPress={() => handleOpenReasonPopup('approve')}>
                        <IoCheckmark className="min-h-4 min-w-4 text-green-500" />
                    </Button>
                    <Button className="min-h-5 min-w-5 w-5 h-5 rounded-full bg-lightContainer dark:!bg-darkContainer border p-1 border-red-500" onPress={() => handleOpenReasonPopup('reject')}>
                        <MdClose className="min-h-5 min-w-5 text-red-500" />
                    </Button>
                </div>
            )
        }
    };

    const handleOpenReasonPopup = (value: 'reject' | 'approve') => {
        setReason(value);
        setOpenReason(true);
    }

    const fetchData = useCallback(async () => {
        // const token = getTokenFromCookie();
        setBills(undefined);
        setSelectedRows([]);

        // if (!token) return;

        const response = await fetch('/api/bills');
        const data: BillRecord[] = await response.json();

        if (data) {
            const pendingBills = data.filter(bill => bill.Status === 'PENDING');
            setBills(pendingBills);
        }
    }, [currentPage, currentSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <RenderCase condition={openReason}>
                <DetailPopup
                    customWidth="w-full h-full md:w-fit"
                    title={intl("reason")}
                    onClose={() => setOpenReason(false)}
                    icon={<FaQuestionCircle className="h-4 w-4" />}
                    noPadding
                >
                    <div className="p-2 gap-2 flex flex-col">
                        <CustomInputField
                            id="Reason_field"
                            key="Reason_field"
                            type="text-area"
                            value={message}
                            setValue={setMessage}
                            version="1"
                            className="w-full"
                            inputClassName="bg-lightContainer dark:!bg-darkContainerPrimary border border-gray-200 dark:border-white/10 max-h-[250px]"
                        />
                        <Container className="!sticky bottom-0 w-full !rounded-none flex gap-1.5">
                            <CustomButton2
                                version="1"
                                color="error"
                                // onClick={handleSubmit}
                                className="linear w-full rounded-md bg-red-500 dark:!bg-red-500 h-10 text-base font-medium text-white transition duration-200 hover:bg-red-600 
                            active:bg-red-700 dark:text-white dark:hover:bg-red-400 dark:active:bg-red-300 flex justify-center place-items-center"
                            >
                                {loading ? <LoadingUI /> : intl("submit")}
                            </CustomButton2>
                        </Container>
                    </div>
                </DetailPopup>
            </RenderCase>
            <TableSwitcher
                primaryKey="id"
                tableData={bills}
                isPaginated={false}
                renderCell={renderCell}
                renderHeader={renderHeader}
                currentPage={currentPage}
                currentSize={currentSize}
                fetchPageData={fetchData}
                columnsData={columnsData()}
                selectedRows={selectedRows}
                setCurrentPage={setCurrentPage}
                setSelectedRows={setSelectedRows}
                customButton={<CustomButton fetchData={fetchData} />}
                containerClassname="!rounded-xl p-4"
                selectType="none"
                setPageSize={{
                    setCurrentSize,
                    sizeOptions: [10, 20, 30]
                }}
            />
        </>
    );
}

export default PendingBillsHistoryMain;