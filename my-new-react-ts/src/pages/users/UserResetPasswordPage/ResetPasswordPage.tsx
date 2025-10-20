import React from "react";
import ResetPasswordForm from "../../../components/forms/ResetPasswordForm.tsx";

const ResetPasswordPage: React.FC = () => {
    return (
        <div className="p-5 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-[600px] w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-800">
                <div className="p-6 md:p-10 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-semibold mb-1">Forgot password</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Enter your email to reset your password
                        </p>
                    </div>
                    <ResetPasswordForm />
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;