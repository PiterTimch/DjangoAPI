import React, { useContext } from "react";
import type {IParentTopic} from "../../types/topics/IParentTopic.ts";
import { Link } from "react-router";
import { ThemeContext } from "../../layout/ThemeContext";

interface Props {
    topic: IParentTopic;
}

const TopicSideBarRow: React.FC<Props> = ({topic}) => {
    const [isCollapse, setisCollapse] = React.useState(true);
    const { theme } = useContext(ThemeContext);

    const toggleCollapse = () => {
        setisCollapse(!isCollapse);
    }

    return (
        <div className="mb-2">
            <button
                type="button"
                className={`flex items-center justify-between w-full py-2 px-3 text-sm rounded-md transition ${theme === "dark" ? "text-gray-300 hover:bg-[#1a1a1b]" : "text-gray-800 hover:bg-gray-100"}`}
                onClick={toggleCollapse}
                aria-expanded={isCollapse}
            >
                <span className="font-medium">{topic.name}</span>
                <span className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>{isCollapse ? "▲" : "▼"}</span>
            </button>

            {isCollapse && (
                <ul className="mt-1 ml-3 space-y-1">
                    {topic.children && topic.children.length > 0 ? (
                        topic.children.map((child) => (
                            <li key={child.id}>
                                <Link
                                    to={`/topics/${child.url_slug}`}
                                    className={theme === "dark" ? "block text-gray-400 hover:text-gray-200 text-[13px]" : "block text-gray-700 hover:text-gray-900 text-[13px]"}
                                >
                                    {child.name}
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className={theme === "dark" ? "text-gray-500 text-xs" : "text-gray-400 text-xs"}>Немає підтем</li>
                    )}
                </ul>
            )}
        </div>
    )
}

export default TopicSideBarRow;