declare type AuthState = {
    isAuthenticated: boolean;
    userInfo: StaffInfo | null;
    error: string | SerializedError | null;
    loading: boolean;
}

declare type Role = {
    id: string;
    value: string;
}

declare type ManagedWard = {
    agencyId: string;
    district: string;
    districtId: number;
    id: number;
    level: string;
    postalCode: string;
    province: string;
    provinceId: number;
    ward: string;
    wardId: number;
};

declare type StaffInfo = {
    agencyId?: string;
    avatar?: string;
    bank?: string;
    bin?: string;
    birthDate?: string;
    cccd?: string;
    createdAt: string;
    deposit?: number;
    detailAddress?: string;
    district?: string;
    email: string;
    fullname: string;
    id: string;
    paidSalary?: number;
    phoneNumber: string;
    province?: string;
    roles: Role[];
    salary?: number;
    staffId?: string;
    town?: string;
    updatedAt: string;
    username: string;
    managedWards?: ManagedWard[];
};

declare type RejectedValue = string | SerializedError;