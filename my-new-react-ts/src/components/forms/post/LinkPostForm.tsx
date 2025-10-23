import { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "../../inputs/InputField";
import SelectField from "../../inputs/SelectField";
import BaseButton from "../../buttons/BaseButton";
import { useCreatePostMutation } from "../../../services/postService";
import { useGetTopicsQuery } from "../../../services/topicService";
import type { IPostCreate } from "../../../types/posts/IPostCreate";

const LinkPostForm: React.FC = () => {
    const navigate = useNavigate();
    const [createPost, { isLoading, error }] = useCreatePostMutation();
    const { data: topics = [] } = useGetTopicsQuery();

    const [formValues, setFormValues] = useState<IPostCreate>({
        title: "",
        video_url: "",
        user_id: 14,
        topic_id: 0,
    });

    const [errors, setErrors] = useState<string[]>([]);

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid) setErrors((prev) => prev.filter((f) => f !== fieldKey));
        else if (!errors.includes(fieldKey)) setErrors((prev) => [...prev, fieldKey]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formValues.title.trim()) return setErrors(["title"]);
        if (!formValues.video_url.trim()) return setErrors(["video_url"]);
        if (!formValues.topic_id) return setErrors(["topic_id"]);

        try {
            await createPost(formValues).unwrap();
            navigate("/");
        } catch {
            // помилка відображається через RTK Query
        }
    };

    const topicOptions = topics.map((t) => ({ value: t.id, label: t.name }));

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 text-sm text-red-700 bg-red-50 rounded-md dark:bg-gray-800 dark:text-red-400">
                    Помилка створення посту
                </div>
            )}

            <InputField
                label="Назва"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Назва обов’язкова" }]}
            />

            <InputField
                label="Посилання"
                name="video_url"
                value={formValues.video_url}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Посилання обов’язкове" }]}
            />

            <SelectField
                label="Тема"
                name="topic_id"
                value={formValues.topic_id}
                options={topicOptions}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Оберіть тему" }]}
            />

            <BaseButton
                type="submit"
                className="w-full rounded-xl !bg-purple-500 dark:!bg-gray-900 text-white font-medium py-2"
            >
                {isLoading ? "Creating..." : "Створити пост з посиланням"}
            </BaseButton>
        </form>
    );
};

export default LinkPostForm;
