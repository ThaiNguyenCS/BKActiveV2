import { FC } from "react";
import RenderCase from "../render";
import TextInputV1 from "./textversions/v1";
import SelectInputV1 from "./selectversions/v1";

const SELECT_INPUT_SWITCHER_VERSIONS: Record<SelectInputVersion, FC<SelectInputProps>> = {
    '1': SelectInputV1,
};

const TEXT_INPUT_SWITCHER_VERSIONS: Record<TextInputVersion, FC<TextInputProps>> = {
    '1': TextInputV1,
};

const CustomInputField = ({ version = '1', label, type, containerClassName, ...props }: InputFieldProps) => {
    const SelectInputComponent = SELECT_INPUT_SWITCHER_VERSIONS[(version ?? '1') as SelectInputVersion] || null;
    const TextInputComponent = TEXT_INPUT_SWITCHER_VERSIONS[(version ?? '1') as TextInputVersion] || null;
    return (
        <div className={containerClassName}>
            {label}
            <RenderCase condition={type === 'select'}>
                <SelectInputComponent {...(props as SelectInputProps)} />
            </RenderCase>
            <RenderCase condition={type !== 'select'}>
                <TextInputComponent type={type} {...(props as TextInputProps)} />
            </RenderCase>
        </div>
    );
};

export default CustomInputField;