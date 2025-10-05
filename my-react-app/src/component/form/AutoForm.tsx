import React from "react";
import type {FormField} from "./FormField.tsx";
import BaseFormInput from "./BaseFormInput.tsx";

interface AutoFormProps {
    fields: FormField[];
    onSubmit: (data: Record<string, any>) => void;
    submitLabel?: string;
}

const AutoForm: React.FC<AutoFormProps> = ({ fields, onSubmit, submitLabel = "Submit" }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => {
                if (field.component) {
                    return (
                        <div key={field.name} className={field.wrapperClassName ?? "mb-5"}>
                            {field.component}
                        </div>
                    );
                }

                return (
                    <div key={field.name} className={field.wrapperClassName ?? "mb-5"}>
                        <BaseFormInput {...field} />
                    </div>
                );
            })}

            <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
            >
                {submitLabel}
            </button>
        </form>
    );
};

export default AutoForm;
