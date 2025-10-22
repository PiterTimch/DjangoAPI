import { useResetPasswordMutation } from "../../../services/userService.ts";
import { useNavigate, useParams } from "react-router";
import type { IResetPasswordConfirm } from "../../../types/users/IResetPasswordConfirm.ts";
import {useState} from "react";
import InputField from "../../inputs/InputField.tsx";
import BaseButton from "../../buttons/BaseButton.tsx";

const ResetPasswordForm: React.FC = () => {
    const [reset, { isLoading }] = useResetPasswordMutation();
    const navigate = useNavigate();
    const { uid, token } = useParams<{ uid: string; token: string }>();

    const [formValues, setFormValues] = useState<IResetPasswordConfirm>({ new_password: "", confirm_password: "", token: token as string, uid: uid as string });

    const [errors, setErrors] = useState<string[]>([]);

    const onFinish = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload: IResetPasswordConfirm = {
                uid: formValues.uid,
                token: formValues.token,
                new_password: formValues.new_password,
                confirm_password: formValues.confirm_password,
            };

            await reset(payload).unwrap();
            navigate("/login");
        } catch (err: any) {
            console.error(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
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
                label="Password"
                name="new_password"
                placeholder="********"
                value={formValues.new_password}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Password is required" }]}
            />

            <InputField
                label="Confirm Password"
                name="confirm_password"
                placeholder="********"
                value={formValues.confirm_password}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Password is required" }]}
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

export default ResetPasswordForm;
