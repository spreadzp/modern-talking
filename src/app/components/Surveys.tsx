 
import ExpandableContent from './ExpandableTable';
import { SurveyTable } from './SurveyTable';

const Surveys: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#76004f] to-[#4b4fa6]">
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Surveys</h1>

                <ExpandableContent title="Surveys" isOpenContent={false}>
                    <SurveyTable />
                </ExpandableContent>

            </div>
        </div>
    );
};

export default Surveys;