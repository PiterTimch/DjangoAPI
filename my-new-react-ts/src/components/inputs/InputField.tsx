import React from "react";

interface InputFieldProps {
    name: string;
    label: string;
    type?: "text" | "email" | "password";
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
                                                   name,
                                                   label,
                                                   type = "text",
                                                   placeholder,
                                                   value,
                                                   onChange,
                                               }) => {
    return (
            <div className="w-full mb-5">
                    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {label}
                    </label>
                    <input
                        id={name}
                        name={name}
                        type={type}
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
            </div>
    );
};

export default InputField;

 