import {useResetPasswordRequestMutation} from "../../../services/userService.ts";
import {useNavigate} from "react-router";
import type {IResetPasswordRequest} from "../../../types/users/IResetPasswordRequest.ts";
import InputField from "../../inputs/InputField.tsx";
import BaseButton from "../../buttons/BaseButton.tsx";
import { useState } from "react";

const ResetPasswordRequestForm: React.FC = () => {
    const [resetRequest, { isLoading }] = useResetPasswordRequestMutation();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState<IResetPasswordRequest>({ email: "" });

    const [errors, setErrors] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const onFinish = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await resetRequest(formValues).unwrap();
            console.log(result)
            navigate('/success-confirm');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0];
            console.error(errorMessage);
        }
    };

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter((x) => x !== fieldKey));
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors((state) => [...state, fieldKey]);
        }
    };

    return (
        <form onSubmit={onFinish} className="space-y-4">
            <InputField
                label="Email"
                name="email"
                placeholder="pedro@gmail.com"
                value={formValues.email}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Email is required" }]}
            />

            <BaseButton
                type="submit"
                className="w-full rounded-xl !bg-purple-500 dark:!bg-gray-900 text-white font-medium py-2"
            >
                {isLoading ? "Loading..." : "Reset"}
            </BaseButton>
        </form>
    );
};

export default ResetPasswordRequestForm;