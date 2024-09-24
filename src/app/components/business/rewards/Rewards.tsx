
import ExpandableContent from '../../shared/ExpandableTable';
import RewardsTable from './RewardsTable';

interface RewardsProps {
    contentData: any;
}

const Rewards: React.FC<RewardsProps> = ({ contentData }) => {
    return (
        <>
            <div className="">
                <div className="container mx-auto p-4">
                    <ExpandableContent title="Rewards" isOpenContent={false}>
                        <RewardsTable contentData={contentData} />
                    </ExpandableContent>

                </div>
            </div>
        </>
    );
};

export default Rewards;