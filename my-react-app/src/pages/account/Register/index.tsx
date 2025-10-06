import React from "react";
import AutoForm from "../../../component/form/AutoForm";
import ImageUploader from "../../../component/form/ImageUploader";
import type {FormField} from "../../../component/form/FormField.tsx";
import {useRegisterUserMutation} from "../../../services/userService.ts";
import type {IRegisterItem} from "../../../types/users/IUserRegister.ts";
import {useNavigate} from "react-router";

const registerFields: FormField[] = [
    { label: "Name", name: "name", placeholder: "John", wrapperClassName: "w-1/2 px-3" },
    { label: "Surname", name: "surname", placeholder: "Smith", wrapperClassName: "w-1/2 px-3" },
    { label: "Email", name: "email", type: "email", placeholder: "qwe@qwe.com", wrapperClassName: "w-full px-3" },
    { label: "Password", name: "password", type: "password", placeholder: "********", wrapperClassName: "w-full px-3" },
    { label: "Avatar", name: "avatar", placeholder: "", wrapperClassName: "w-full px-3", component: <ImageUploader /> }
];

const RegisterPage: React.FC = () => {
    const [registerUser, { isLoading, error }] = useRegisterUserMutation();

    const navigate = useNavigate();

    const handleRegister = async (data: Record<string, any>) => {
        const payload: IRegisterItem = {
            id: 0,
            first_name: data.name,
            last_name: data.surname,
            email: data.email,
            avatar: "",
            password: data.password,
        };

        if (data.avatar instanceof File) {
            payload.avatar = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (err) => reject(err);
                reader.readAsDataURL(data.avatar);
            });
        } else if (typeof data.avatar === "string") {
            payload.avatar = data.avatar;
        }

        const result = await registerUser(payload);

        if (!("error" in result)) {
            navigate('/');
        }
    };


    const formErrors: string[] = [];
    if (error && "data" in error) {
        for (const key in error.data!) {
            //@ts-ignore
            const value = error.data[key];
            if (Array.isArray(value)) {
                formErrors.push(...value);
            } else {
                formErrors.push(String(value));
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-4xl">
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
                        <h2 className="text-white font-bold text-2xl">Welcome!</h2>
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-5">
                            <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                            <p>Enter your information to register</p>
                        </div>

                        {formErrors.length > 0 && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                {formErrors.map((err, i) => (
                                    <div key={i}>{err}</div>
                                ))}
                            </div>
                        )}

                        <AutoForm fields={registerFields} onSubmit={handleRegister} submitLabel={isLoading ? "Loading..." : "REGISTER NOW"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
