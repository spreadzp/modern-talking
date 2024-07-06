import { useState } from "react";

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
            <h2 className="text-xl font-semibold mb-2 cursor-pointer" onClick={toggleExpansion} >
                {title} {isExpanded ? '▲' : '▼'}
            </h2>
            {isExpanded && children}
        </div>
    );
};

export default ExpandableContent;
