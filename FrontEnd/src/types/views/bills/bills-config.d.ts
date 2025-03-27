declare type BillsType = 'INVOICE' | 'RECEIPT' | 'OTHER';

declare type BillStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

declare type BillData = {
    amount: string;
    type: BillsType | BillsType[];
    note: string;
}

declare type BillRecord = BillData & {
    Status: BillStatus;
    createdAt: string;
    updatedAt: string;
    id: string;
    reason?: string;
};