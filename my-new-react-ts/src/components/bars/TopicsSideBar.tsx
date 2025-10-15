import { Collapse, Spin } from "antd";
import {Link} from "react-router";
import {useGetTopicsQuery} from "../../services/topicService.ts";

const { Panel } = Collapse;

const TopicsSidebar: React.FC = () => {
    const { data: topics, isLoading, isError } = useGetTopicsQuery();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-6">
                <Spin size="large" />
            </div>
        );
    }

    if (isError || !topics) {
        return <div className="text-gray-500 p-4">Не вдалося завантажити топіки 😢</div>;
    }

    return (
        <aside className="w-64 shrink-0 border-r border-gray-200 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">Теми</h2>

            <div className="overflow-y-auto max-h-[calc(100vh-180px)]">
                <Collapse
                    ghost
                    accordion={false}
                    expandIconPosition="end"
                    className="bg-transparent"
                >
                    {topics.map((topic) => (
                        <Panel
                            key={topic.id}
                            header={
                                <Link
                                    to={`/topics/${topic.url_slug}`}
                                    className="text-gray-800 hover:text-blue-600 font-medium"
                                >
                                    {topic.name}
                                </Link>
                            }
                            className="bg-white border border-gray-100 rounded-md mb-2 shadow-sm"
                        >
                            {topic.children && topic.children.length > 0 ? (
                                <ul className="pl-3 space-y-1">
                                    {topic.children.map((child) => (
                                        <li key={child.id}>
                                            <Link
                                                to={`/topics/${child.url_slug}`}
                                                className="text-gray-600 hover:text-blue-500 text-sm"
                                            >
                                                {child.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <span className="text-gray-400 text-sm">Немає підтем</span>
                            )}
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </aside>
    );
};

export default TopicsSidebar;
