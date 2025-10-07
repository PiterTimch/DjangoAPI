import React, { useState } from "react";
import type { FormField } from "./FormField.tsx";
import BaseFormInput from "./BaseFormInput.tsx";

interface AutoFormProps {
    fields: FormField[];
    onSubmit: (data: Record<string, any>) => void;
    submitLabel?: string;
}

const AutoForm: React.FC<AutoFormProps> = ({ fields, onSubmit, submitLabel = "Submit" }) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleChange = (name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap -mx-3">
                {fields.map((field) => {
                    const value = formData[field.name] ?? "";

                    if (field.component) {
                        return (
                            <div key={field.name} className={field.wrapperClassName ?? "mb-5"}>
                                {React.cloneElement(field.component as React.ReactElement, {
                                    value,
                                    onChange: (v: any) => handleChange(field.name, v),
                                })}
                            </div>
                        );
                    }

                    return (
                        <div key={field.name} className={field.wrapperClassName ?? "mb-5"}>
                            <BaseFormInput
                                {...field}
                                value={value}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                            />
                        </div>
                    );
                })}
            </div>

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
