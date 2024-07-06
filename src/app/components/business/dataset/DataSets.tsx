 
import ExpandableContent from '../../shared/ExpandableTable'; 
import DataSetTable from './DataSetTable';

const DataSets: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <ExpandableContent title="DataSets" isOpenContent={true}>
                    <DataSetTable />
                </ExpandableContent>

            </div>
        </div>
    );
};

export default DataSets;