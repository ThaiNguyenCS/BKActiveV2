import { OrderStatus } from "@/services/interface";

declare type JourneyData = {
    id: number;
    message: string;
    orderId: string;
    time: string;
};

declare type Insurance = {
    createdAt: string;
    hasDeliveryCare: boolean;
    id: string;
    note: string;
    orderId: string;
    shippingBillId: string;
    updatedAt: string;
}

declare type OrderData = {
    agencyId: string;
    cod: number;
    createdAt: string;
    customerId: string;
    deliverDoorToDoor: boolean;
    detailDest: string;
    detailSource: string;
    districtDest: string;
    districtSource: string;
    fee?: number;
    fromMass: number;
    goodType: string;
    height: number;
    id: UUID;
    images: string[];
    isBulkyGood: boolean;
    journies: JourneyData[];
    latDestination: number;
    latSource: number;
    length: number;
    longDestination: number;
    longSource: number;
    mass: number;
    miss: number;
    nameReceiver: string;
    nameSender: string;
    note?: string;
    orderCode: number;
    paid: boolean;
    parent?: string;
    phoneNumberReceiver: string;
    phoneNumberSender: string;
    provinceDest: string;
    provinceSource: string;
    qrcode: string;
    receiverWillPay: boolean;
    serviceType: string;
    shipper?: string;
    signature?: string;
    signatures: string[];
    statusCode: OrderStatus | OrderStatus[];
    takingDescription?: string;
    toMass: number;
    trackingNumber: string;
    updatedAt: string;
    wardDest: string;
    wardSource: string;
    width: number;
};

declare type OrderState = "ALL" | "PROCESSING" | "NTHIRD_PARTY_DELIVERY";