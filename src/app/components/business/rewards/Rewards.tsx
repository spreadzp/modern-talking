 
import ExpandableContent from '../../shared/ExpandableTable'; 
import StarryBackground from '../../shared/StarryBackground';
import RewardsTable from './RewardsTable'; 

interface RewardsProps {
    contentData: any;
}

const Rewards: React.FC<RewardsProps> = ({ contentData }) => {
    return (
        <>
        <StarryBackground />
        <div className="">
            <div className="container mx-auto p-4">
                <ExpandableContent title="Rewards" isOpenContent={false}>
                    <RewardsTable contentData={contentData}/>
                </ExpandableContent>

            </div>
        </div>
        </>
    );
};

export default Rewards;