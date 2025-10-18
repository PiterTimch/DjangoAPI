import { Spin } from "antd";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFire,
    faComments,
    faCompass,
    // faChevronDown,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {useGetRootTopicsQuery} from "../../services/topicService.ts";
import TopicSideBarRow from "./TopicSidebarRow.tsx";

// const { Panel } = Collapse;

const TopicsSidebar: React.FC = () => {
    const { data: topics, isLoading, isError } = useGetRootTopicsQuery();
    const [collapsed, setCollapsed] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-6 bg-gray-950 text-gray-200 h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (isError || !topics) {
        return (
            <div className="text-gray-400 p-4 bg-gray-950 h-screen">
                Не вдалося завантажити топіки
            </div>
        );
    }

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <aside
            className={`h-screen left-0 bg-gray-950 text-gray-200 flex flex-col border-r border-gray-800 overflow-y-auto px-3 py-4 transition-all duration-300 ${
                collapsed ? "w-16" : "w-64"}`}
        >
            <div className="flex justify-end">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-400 hover:text-gray-200 transition"
                >
                    <FontAwesomeIcon icon={collapsed ? faAngleRight : faAngleLeft} />
                </button>
            </div>

            <nav className="space-y-1 mb-6">
                <Link
                    to="/"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1b] transition"
                >
                    <FontAwesomeIcon icon={faHouse} className="w-4 h-4 text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Home</span>}
                </Link>

                <Link
                    to="/popular"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1b] transition"
                >
                    <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Popular</span>}
                </Link>

                <Link
                    to="/answers"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1b] transition"
                >
                    <FontAwesomeIcon icon={faComments} className="w-4 h-4 text-gray-300" />
                    {!collapsed && (
                        <span className="text-sm font-medium">
                            Answers <span className="text-orange-500 text-xs ml-1">BETA</span>
                        </span>
                    )}
                </Link>

                <Link
                    to="/explore"
                    className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-[#1a1a1b] transition"
                >
                    <FontAwesomeIcon icon={faCompass} className="w-4 h-4 text-gray-300" />
                    {!collapsed && <span className="text-sm font-medium">Explore</span>}
                </Link>
            </nav>

            <div className="border-t border-gray-800 mb-4"></div>

            {!collapsed && (
                <span className="uppercase text-[11px] tracking-wider text-gray-500 font-semibold mb-2 px-3">
                    Topics
                </span>
            )}

            <div
                className={`overflow-y-auto pr-1 ${
                    collapsed ? "hidden" : ""
                } scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900`}
                style={{
                    scrollbarWidth: "thin", // для Firefox
                    scrollbarColor: "#4b5563 #1f1f1f", // thumb та track для Firefox
                }}
            >
                <div id="accordion-open">
                    {topics.map((topic) => (
                        <TopicSideBarRow key={topic.id} topic={topic} />
                    ))}
                </div>

                <div className="mt-3 px-3">
                    <button className="text-gray-400 text-sm hover:text-gray-200 transition">
                        See more
                    </button>
                </div>
            </div>

        </aside>
    );
};

export default TopicsSidebar;
