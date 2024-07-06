 
import ExpandableContent from '../../shared/ExpandableTable';  
import VotingTable from './VotingTable';

const VotingList: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <ExpandableContent title="Voting List" isOpenContent={true}>
                    <VotingTable />
                </ExpandableContent>

            </div>
        </div>
    );
};

export default VotingList;