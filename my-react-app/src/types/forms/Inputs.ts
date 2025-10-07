export interface BaseFormInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    labelClassName?: string;
    inputClassName?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
