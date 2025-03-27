"use client";

import { useTranslations } from "next-intl";
import TableSwitcher from "@/components/table";
import { getTokenFromCookie } from "@/utils/token";
import CustomButton from "@/views/customTableButton";
import { useCallback, useEffect, useState } from "react";
import { columnsData } from "../variables/columnsData";

const BillsHistoryMain = () => {
    const intl = useTranslations("BillsRoute");
    const [bills, setBills] = useState<BillRecord[]>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSize, setCurrentSize] = useState<number>(10);
    const [selectedRows, setSelectedRows] = useState<BillRecord[]>([]);

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
        }
    };

    const fetchData = useCallback(async () => {
        // const token = getTokenFromCookie();
        setBills(undefined);
        setSelectedRows([]);

        // if (!token) return;

        const respone = await fetch('/api/bills');
        const data: BillRecord[] = await respone.json();

        if (data) {
            setBills(data);
        }
    }, [currentPage, currentSize]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <TableSwitcher
                primaryKey="id"
                tableData={bills}
                isPaginated={false}
                renderCell={renderCell}
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

export default BillsHistoryMain;