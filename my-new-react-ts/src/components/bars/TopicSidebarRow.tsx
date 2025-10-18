import React, {useState} from "react";
import type {IParentTopic} from "../../types/topics/IParentTopic";
import {Link} from "react-router";

interface Props {
    topic: IParentTopic;
}

const TopicSideBarRow: React.FC<Props> = ({topic}) => {
    const {name} = topic;
    const [isCollapse, setIsCollapse] = useState(false);
    const toggleCollapse = () => {
        setIsCollapse(!isCollapse);
    }
    return (
        <>
            <h2 id="accordion-open-heading-1" onClick={toggleCollapse}>
                <button type="button"
                        className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                        data-accordion-target="#accordion-open-body-1" aria-expanded="true"
                        aria-controls="accordion-open-body-1">
                    <span className="flex items-center">{name}</span>
                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                </button>
            </h2>
            <div id="accordion-open-body-1" className={isCollapse ? "block" : "hidden"}
                 aria-labelledby="accordion-open-heading-1">
                {topic.children && topic.children.length > 0 ? (
                        <ul className="space-y-4 sm:mb-4 md:mb-0" aria-labelledby="mega-menu-full-cta-button">
                            {topic.children.map((child) => (

                                    <li key={child.id}>
                                        <Link to={`/topics/${child.url_slug}`} className="hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                            {child.name}
                                        </Link>
                                    </li>
                                )
                            )}

                        </ul>
                    )
                    : (
                        <span className="text-gray-500 text-xs">Немає підтем</span>
                    )}

            </div>
        </>
    )
}

export default TopicSideBarRow;