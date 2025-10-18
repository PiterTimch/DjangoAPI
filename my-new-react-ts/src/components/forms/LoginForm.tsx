import {Form, Input, Button, type FormProps} from "antd";
import {useLoginByGoogleMutation, useLoginMutation} from "../../services/userService.ts";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {Link, useNavigate} from "react-router";
import type {ILoginRequest} from "../../types/users/ILoginRequest.ts";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import {useGoogleLogin} from "@react-oauth/google";
import type {IGoogleLoginRequest} from "../../types/users/IGoogleLoginRequest.ts";
import InputField from "../inputs/InputField.tsx";
import {useState} from "react";

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const [login, {isLoading}] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [loginByGoogle, {isLoading: isGoogleLoading}] = useLoginByGoogleMutation();

    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const model: IGoogleLoginRequest = {token: tokenResponse.access_token};

                const result = await loginByGoogle(model).unwrap();
                dispatch(setTokens(result));
                navigate('/');
            } catch (error) {
                console.error(error);
            }
        },
    });

    const [errors, setErrors] = useState<string[]>([]);

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter(x => x !== fieldKey))
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors(state => [...state, fieldKey])
        }
    };

    const onFinish: FormProps<ILoginRequest>["onFinish"] = async (values) => {
        if (!executeRecaptcha) return;

        const token = await executeRecaptcha('login');
        const payload: ILoginRequest = {...values, recaptcha_token: token};

        try {
            const result = await login(payload).unwrap();
            console.log(result);
            dispatch(setTokens(result));
            navigate('/');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0];
            console.error(errorMessage);
        }
    };

    return (
        <>
            <div>
                <InputField
                    label="Username"
                    name="username"
                    placeholder="pedro"/>

                <InputField
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="********"
                    rules={[
                        {
                            rule: 'required',
                            message: "Пошта є обов'язкова"
                        },
                        {
                            rule: 'regexp',
                            value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                            message: "Пошта є некоректна"
                        }
                    ]}
                    onValidationChange={validationChange}
                />
            </div>


            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{width: "100%"}}
            >
                <Form.Item
                    label="User name"
                    name="username"
                    rules={[
                        {required: true, message: "Please enter your email"}
                    ]}
                >
                    <Input placeholder="johnsmith"/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: "Please enter your password"}]}
                >
                    <Input.Password placeholder="********"/>
                </Form.Item>

                <Link to="/forgot-password"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300">Forgot
                    password?</Link>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading || isGoogleLoading}
                        block
                        style={{height: "40px", fontWeight: 600}}
                    >
                        Login
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        onClick={(event) => {
                            event.preventDefault();
                            loginUseGoogle();
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                        Увійти Google
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;