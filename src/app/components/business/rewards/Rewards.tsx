 
import ExpandableContent from '../../shared/ExpandableTable'; 
import StarryBackground from '../../shared/StarryBackground';
import RewardsTable from './RewardsTable'; 
const Rewards: React.FC = () => {
    return (
        <>
        <StarryBackground />
        <div className="">
            <div className="container mx-auto p-4">
                <ExpandableContent title="Rewards" isOpenContent={false}>
                    <RewardsTable />
                </ExpandableContent>

            </div>
        </div>
        </>
    );
};

export default Rewards;