import React from "react";
import type {BaseFormInputProps} from "../../types/forms/Inputs.ts";

const BaseFormInput: React.FC<BaseFormInputProps> = ({
                                                         label,
                                                         name,
                                                         type = "text",
                                                         placeholder,
                                                         labelClassName = "text-xs font-semibold px-1",
                                                         inputClassName = "w-full pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                     }) => {
    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className={labelClassName}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                className={inputClassName}
                placeholder={placeholder}
            />
        </div>
    );
};

export default BaseFormInput;
