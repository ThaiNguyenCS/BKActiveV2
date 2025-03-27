"use client";

import { useState } from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import CustomInputField from "@/components/input";

const InfoContent = () => {
    const intl = useTranslations("StaffInfo");

    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const [userData, setUserData] = useState<StaffInfo>(userInfo ?? {
        id: "",
        createdAt: "",
        email: "",
        fullname: "",
        phoneNumber: "",
        roles: [],
        updatedAt: "",
        username: ""
    });

    const handleChange = (id: keyof StaffInfo, value: string) => {
        setUserData(prev => ({ ...prev, [id]: value }));
    };

    const getRolesValue = (roles: Role[]): string => {
        return roles.map(role => role.value).join(", ");
    };

    const infoFields: Array<{
        id: keyof StaffInfo;
        type: InputTypes;
        disable?: boolean;
        onChange?: (id: keyof StaffInfo, value: string) => void;
    }> = [
            { id: "username", type: "text", disable: true },
            { id: "fullname", type: "text", disable: true },
            { id: "email", type: "text", disable: true },
            { id: "phoneNumber", type: "text", disable: true },
            { id: "cccd", type: "text", disable: true },
            { id: "roles", type: "text", disable: true },
        ];

    return (
        <>
            {infoFields.map(({ id, type, disable, onChange }) => (
                <div key={id as string} className="flex gap-2 w-full flex-col lg:flex-row">
                    <div className='lg:w-44 lg:min-w-[11rem] flex lg:justify-between place-items-center'>
                        <strong className="flex gap-1">{intl(id)}</strong>:
                    </div>
                    <p className="whitespace-nowrap flex flex-row gap-2 relative w-full">
                        <CustomInputField
                            id={id}
                            type={type}
                            disabled={disable}
                            value={id === "roles" ? getRolesValue(userData["roles"]) : userData[id as keyof StaffInfo] as string}
                            setValue={(value: string) => onChange ? onChange(id, value) : handleChange(id, value)}
                            className="w-full"
                        />
                    </p>
                </div>
            ))
            }
        </>
    )
}

export default InfoContent;