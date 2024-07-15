 
import ExpandableContent from '../../shared/ExpandableTable'; 
import StarryBackground from '../../shared/StarryBackground';
import DataSetTable from './DataSetTable';

const DataSets: React.FC = () => {
    return (
        <>
        <StarryBackground />
        <div className="min-h-screen ">
            <div className="container mx-auto p-4">
                <ExpandableContent title="DataSets" isOpenContent={true}>
                    <DataSetTable />
                </ExpandableContent>

            </div>
        </div>
        </>
    );
};

export default DataSets;