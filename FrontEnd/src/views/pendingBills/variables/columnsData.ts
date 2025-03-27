import { Column } from "react-table";
import { useTranslations } from "next-intl";

export const columnsData = (): Column<BillRecord>[] => {
    const intl = useTranslations("BillsRoute");

    return [
        {
            Header: intl("id"),
            accessor: "id",
        },
        {
            Header: intl("type"),
            accessor: "type",
        },
        {
            Header: intl("amount"),
            accessor: "amount",
        },
        {
            Header: intl("Status"),
            accessor: "Status",
        },
        {
            Header: intl("note"),
            accessor: "note",
        },
        {
            Header: intl("action"),
            accessor: "reason",
        },
    ];
};