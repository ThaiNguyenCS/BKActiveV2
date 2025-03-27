import { FC } from "react";
import RenderCase from "../render";
import CheckTableV1 from "./versions/v1";
import { TableData, TableProps, TableVersion } from "@/types/components/table-config";

const TABLE_SWITCHER_VERSIONS: Record<TableVersion, FC<TableProps<TableData>>> = {
    '1': CheckTableV1,
};

const TableSwitcher = <T extends TableData>({
    version,
    ...props
}: TableProps<T>) => {
    const VersionComponent = TABLE_SWITCHER_VERSIONS[(version ?? '1') as TableVersion];

    return (
        <RenderCase condition={!!VersionComponent}>
            <VersionComponent {...(props as unknown as TableProps<TableData>)} />
        </RenderCase>
    );
};

export default TableSwitcher;