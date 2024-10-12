import React, { useEffect, useState } from "react";
import Title, { TitleEffect, TitleSize } from "./Title";
import { Reward, RewardStatusEnum } from '@prisma/client';
import { getRewardsByStatus } from '@/server/reward';

type ExpandableContentProps = {
    title: string;
    //childrenRewards?: (data: Reward[]) => React.ReactNode;
    children?: any;
    status?: RewardStatusEnum;
    isOpenContent: boolean;
};

const ExpandableContent: React.FC<ExpandableContentProps> = ({ title, children, status, isOpenContent }) => {
    const [isExpanded, setIsExpanded] = useState(isOpenContent);
    const [data, setData] = useState<Reward[]>([]);
    const [selectedChildren, setSelectedChildren] = useState<any>({} as any);

    useEffect(() => {
        if (isExpanded && status) {
            getRewardsByStatus(status).then(fetchedData => {
                setData(fetchedData);
            });
        }
        if (status && data && children) {
            setSelectedChildren(children(data));
        }
        if (children) {
            setSelectedChildren(children);
        }

    }, [isExpanded, status, data, children]);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="w-full text-center text-white font-bold mb-4">
            <div className="flex items-center justify-center text-xl font-semibold mb-2 cursor-pointer" onClick={toggleExpansion}>
                <Title
                    titleName={title}
                    titleSize={TitleSize.H4}
                    titleEffect={TitleEffect.Gradient}
                /> <div>{isExpanded ? '▲' : '▼'}</div>
            </div>
            {isExpanded && selectedChildren}
        </div>
    );
};

export default ExpandableContent;