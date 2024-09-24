import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSiteStore } from '../../../hooks/store';
import Spinner from '../../shared/Spinner';
import { getRewardById } from '@/server/reward';

const RewardById: React.FC = () => {
    const pathname = usePathname();
    const { reward, setReward } = useSiteStore();

    useEffect(() => {
        const parsedId = pathname.split('/')[2];
        if (parsedId !== '') {
            getRewardById(+parsedId).then((data: any) => {
                if (data) {
                    setReward(data);
                }
            });
        }
    }, [setReward, pathname]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center  ">
                {!reward.description ? (
                    <Spinner />
                ) : (
                    <div className="container mx-auto p-6   shadow-lg rounded-lg text-white">
                        <div className="overflow-y-auto p-4 border-2 border-dotted border-white-500 rounded-md">
                            <h2 className="text-2xl font-bold mb-4 text-white-800">{reward.description}</h2>
                            <div className="mb-4">
                                <span className="font-semibold text-white-700">Condition:</span> {reward.condition}
                            </div>
                            <div>
                                <span className="font-semibold text-white-700">Sum:</span> {reward.sum}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RewardById;