import { useState } from "react";
import { useNavigate } from "react-router";
import InputField from "../../inputs/InputField";
import TextareaField from "../../inputs/TextareaField";
import FileUploadField from "../../inputs/FileUploadField";
import SelectField from "../../inputs/SelectField";
import BaseButton from "../../buttons/BaseButton";
import { useCreatePostMutation } from "../../../services/postService";
import { useGetTopicsQuery } from "../../../services/topicService";
import type { IPostCreate } from "../../../types/posts/IPostCreate";

const MediaPostForm: React.FC = () => {
    const navigate = useNavigate();
    const [createPost, { isLoading, error }] = useCreatePostMutation();
    const { data: topics = [] } = useGetTopicsQuery();

    const [formValues, setFormValues] = useState<IPostCreate>({
        title: "",
        body: "",
        image: null,
        video: null,
        user_id: 14,
        topic_id: 0,
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [fileErrors, setFileErrors] = useState<{ image?: string; video?: string }>({});

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid) setErrors((prev) => prev.filter((f) => f !== fieldKey));
        else if (!errors.includes(fieldKey)) setErrors((prev) => [...prev, fieldKey]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const setFile = (name: "image" | "video", file: File | null) => {
        setFormValues((prev) => ({ ...prev, [name]: file }));
        setFileErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // базова валідація
        if (!formValues.title.trim()) return setErrors(["title"]);
        if (!formValues.topic_id) return setErrors(["topic_id"]);
        if (!formValues.image && !formValues.video) return setFileErrors({ image: "Завантажте хоча б зображення або відео" });

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

            <TextareaField
                label="Опис"
                name="body"
                value={formValues.body}
                onChange={handleChange}
            />

            <FileUploadField
                label="Зображення"
                name="image"
                accept="image/*"
                file={formValues.image}
                setFile={(f) => setFile("image", f)}
                error={fileErrors.image}
                maxSize={5}
                allowedTypes={["image/jpeg", "image/png", "image/gif", "image/webp"]}
            />

            <FileUploadField
                label="Відео"
                name="video"
                accept="video/*"
                file={formValues.video}
                setFile={(f) => setFile("video", f)}
                error={fileErrors.video}
                maxSize={50}
                allowedTypes={["video/mp4", "video/avi", "video/mov", "video/wmv", "video/webm"]}
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
                {isLoading ? "Uploading..." : "Створити медіа пост"}
            </BaseButton>
        </form>
    );
};

export default MediaPostForm;
