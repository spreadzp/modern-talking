 
import ExpandableContent from '../../shared/ExpandableTable'; 
import SurveyTable from './SurveyTable';

const Surveys: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <ExpandableContent title="Surveys" isOpenContent={true}>
                    <SurveyTable />
                </ExpandableContent>

            </div>
        </div>
    );
};

export default Surveys;