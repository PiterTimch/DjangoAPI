import type { BaseFormInputProps } from "../../types/forms/Inputs";

export interface FormField extends BaseFormInputProps {
    wrapperClassName?: string;
    component?: React.ReactNode;
}
