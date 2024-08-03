import { useState } from "react";
import Title, { TitleEffect, TitleSize } from "./Title";

type ExpandableContentProps = {
    title: string;
    children: React.ReactNode;
    isOpenContent: boolean
};

const ExpandableContent: React.FC<ExpandableContentProps> = ({ title, children, isOpenContent }) => {
    const [isExpanded, setIsExpanded] = useState(isOpenContent);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="w-full text-center text-white font-bold mb-4" >
            <h2  className="flex items-center justify-center text-xl font-semibold mb-2 cursor-pointer" onClick={toggleExpansion} >
            <Title
                    titleName={title}
                    titleSize={TitleSize.H4}
                    titleEffect={TitleEffect.Gradient}
                /> {isExpanded ? '▲' : '▼'}
            </h2>
            {isExpanded && children}
        </div>
    );
};

export default ExpandableContent;
