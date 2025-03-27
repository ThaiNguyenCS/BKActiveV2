import {
    UseColumnOrderInstanceProps,
    UseColumnOrderState,
    UseExpandedHooks,
    UseExpandedInstanceProps,
    UseExpandedOptions,
    UseExpandedRowProps,
    UseExpandedState,
    UseFiltersColumnOptions,
    UseFiltersColumnProps,
    UseFiltersInstanceProps,
    UseFiltersOptions,
    UseFiltersState,
    UseGlobalFiltersColumnOptions,
    UseGlobalFiltersInstanceProps,
    UseGlobalFiltersOptions,
    UseGlobalFiltersState,
    UseGroupByCellProps,
    UseGroupByColumnOptions,
    UseGroupByColumnProps,
    UseGroupByHooks,
    UseGroupByInstanceProps,
    UseGroupByOptions,
    UseGroupByRowProps,
    UseGroupByState,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseResizeColumnsColumnOptions,
    UseResizeColumnsColumnProps,
    UseResizeColumnsOptions,
    UseResizeColumnsState,
    UseRowSelectHooks,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectRowProps,
    UseRowSelectState,
    UseRowStateCellProps,
    UseRowStateInstanceProps,
    UseRowStateOptions,
    UseRowStateRowProps,
    UseRowStateState,
    UseSortByColumnOptions,
    UseSortByColumnProps,
    UseSortByHooks,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
    Column
} from "react-table";

declare module "react-table" {

    export interface TableOptions<D extends Record<string, unknown>>
        extends UseExpandedOptions<D>,
        UseFiltersOptions<D>,
        UseGlobalFiltersOptions<D>,
        UseGroupByOptions<D>,
        UsePaginationOptions<D>,
        UseResizeColumnsOptions<D>,
        UseRowSelectOptions<D>,
        UseRowStateOptions<D>,
        UseSortByOptions<D>,
        Record<string, any> { } // eslint-disable-line

    export interface Hooks<
        D extends Record<string, unknown> = Record<string, unknown>
    >
        extends UseExpandedHooks<D>,
        UseGroupByHooks<D>,
        UseRowSelectHooks<D>,
        UseSortByHooks<D> { }

    export interface TableInstance<
        D extends Record<string, unknown> = Record<string, unknown>
    >
        extends UseColumnOrderInstanceProps<D>,
        UseExpandedInstanceProps<D>,
        UseFiltersInstanceProps<D>,
        UseGlobalFiltersInstanceProps<D>,
        UseGroupByInstanceProps<D>,
        UsePaginationInstanceProps<D>,
        UseRowSelectInstanceProps<D>,
        UseRowStateInstanceProps<D>,
        UseSortByInstanceProps<D> { }

    export interface TableState<
        D extends Record<string, unknown> = Record<string, unknown>
    >
        extends UseColumnOrderState<D>,
        UseExpandedState<D>,
        UseFiltersState<D>,
        UseGlobalFiltersState<D>,
        UseGroupByState<D>,
        UsePaginationState<D>,
        UseResizeColumnsState<D>,
        UseRowSelectState<D>,
        UseRowStateState<D>,
        UseSortByState<D> { }

    export interface ColumnInterface<
        D extends Record<string, unknown> = Record<string, unknown>
    >
        extends UseFiltersColumnOptions<D>,
        UseGlobalFiltersColumnOptions<D>,
        UseGroupByColumnOptions<D>,
        UseResizeColumnsColumnOptions<D>,
        UseSortByColumnOptions<D> { }

    export interface ColumnInstance<
        D extends Record<string, unknown> = Record<string, unknown>
    >
        extends UseFiltersColumnProps<D>,
        UseGroupByColumnProps<D>,
        UseResizeColumnsColumnProps<D>,
        UseSortByColumnProps<D> { }

    export interface Cell<
        D extends Record<string, unknown> = Record<string, unknown>,
        V = any // eslint-disable-line
    > extends UseGroupByCellProps<D>, UseRowStateCellProps<D> { }

    export interface Row<
        D extends Record<string, unknown> = Record<string, unknown>
    >
        extends UseExpandedRowProps<D>,
        UseGroupByRowProps<D>,
        UseRowSelectRowProps<D>,
        UseRowStateRowProps<D> { }
};

declare type TableVersion = '1';

declare type TableSelectType = 'none' | 'single' | 'multi';

declare type TableData = Record<[key], string | number | boolean | unknown>;

declare type SetTableSizeProps = {
    sizeOptions: number[];
    setCurrentSize: React.Dispatch<React.SetStateAction<number>>;
}

type NonPaginatedTableProps<T extends TableData> = {
    version?: TableVersion;
    isPaginated?: false;
    selectType?: TableSelectType;
    containerClassname?: string;

    fetchPageData: () => void;

    tableData: T[] | undefined;
    columnsData: Column<T>[];
    renderHeader?: (_cellHeader: string) => string;
    renderCell?: (_cellHeader: string, _cellValue: string | number | boolean, _rowValue: T, _cellIndex: number | string, _isRowSelected: boolean) => React.ReactNode | void;

    maxPage?: number;
    currentSize: number;
    currentPage: number;
    setPageSize?: SetTableSizeProps;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

    primaryKey: keyof T;
    selectedRows: T[];
    setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;

    customButton?: React.ReactNode;
    customNoData?: React.ReactNode;

    onRowClick?: (_value: T) => void;
    fetchSearchSortData?: boolean;
    sortBy?: { id: string; desc: boolean }[];
    setSortBy?: React.Dispatch<React.SetStateAction<{ id: string; desc: boolean }[]>>;

    customSearch?: boolean;
};

type PaginatedTableProps<T extends TableData> = {
    version?: TableVersion;
    isPaginated: true;
    selectType?: TableSelectType;
    containerClassname?: string;

    fetchPageData: (_page?: number, _size?: number) => void;

    tableData: T[] | undefined;
    columnsData: Column<T>[];
    renderHeader?: (_cellHeader: string) => string;
    renderCell?: (_cellHeader: string, _cellValue: string | number | boolean | any, _rowValue: T, _cellIndex: number | string, _isRowSelected: boolean,) => React.ReactNode | void;

    maxPage?: number;
    currentSize: number;
    currentPage: number;
    setPageSize?: SetTableSizeProps;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

    primaryKey: keyof T;
    selectedRows: T[];
    setSelectedRows: React.Dispatch<React.SetStateAction<T[]>>;

    customButton?: React.ReactNode;
    customNoData?: React.ReactNode;

    onRowClick?: (_value: T) => void;
    fetchSearchSortData?: boolean;
    sortBy?: { id: string; desc: boolean }[];
    setSortBy?: React.Dispatch<React.SetStateAction<{ id: string; desc: boolean }[]>>;

    customSearch?: boolean;
};

declare type TableProps<T extends TableData> = NonPaginatedTableProps<T> | PaginatedTableProps<T>;

// tableData: T[]; //Data cần render
// maxPage?: number; //Số trang có thể fetch của table, nếu được truyền vào thì table sẽ giới hạn người dùng khi chuyển trang
// selectedRows: T[]; //Mảng lưu trữ các cột đang được chọn
// setSelectedRows: (_newSelectedRows: T[]) => void; //Hàm set các cột đang được chọn
// primaryKey: keyof T; //Khoá chính dùng để phân biệt các hàng với nhau
// currentPage: number; //Trang hiện tại
// currentSize: number; //Số phần tử trên trang hiện tại
// isPaginated?: boolean; //Sử dụng cơ chế fetch phân trang
// columnsData: Column<T>[]; //Header của từng cột và accessor dựa trên data truyền vào
// selectType?: TableSelectType; //Cho phép người dùng có thể chọn (nhiều) hàng hay không
// customButton: React.ReactNode; //Thêm button cho table
// customNoData?: React.ReactNode; //UI custom khi data truyền vào là mảng rỗng ([])
// onRowClick?: (_cell: Cell) => void; //Được thực hiện khi người dùng nhấn vào một hàng nào đó
// renderHeader?: (_cellheader: string) => string; //Classname của header tương ứng
// fetchPageData: (() => void) | ((_page?: number, _size?: number) => void); //Cơ chế fetch trang
// renderCell?: (_cellHeader: string, _cellValue: string|number|boolean, _cellIndex: number|string, _isRowSelected: boolean) => React.ReactNode; //UI của từng hàng (có mặc định)