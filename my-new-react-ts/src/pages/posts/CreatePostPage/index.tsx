import React from "react";
import TextPostForm from "../../../components/forms/post/TextPostForm.tsx";

const CreatePostPage: React.FC = () => {
    return (
        <div className="p-5 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-[600px] w-full rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-gray-800">
                <div className="p-6 md:p-10 flex flex-col justify-center">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-semibold mb-1">Create post</h3>
                    </div>
                    <TextPostForm />
                </div>
            </div>
        </div>
    );
};

export default CreatePostPage;