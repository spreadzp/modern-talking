 
import ExpandableContent from '../../shared/ExpandableTable'; 
import StarryBackground from '../../shared/StarryBackground';
import SurveyTable from './SurveyTable';

const Surveys: React.FC = () => {
    return (
        <>
        <StarryBackground />
        <div className="min-h-screen ">
            <div className="container mx-auto p-4">
                <ExpandableContent title="Surveys" isOpenContent={true}>
                    <SurveyTable />
                </ExpandableContent>

            </div>
        </div>
        </>
    );
};

export default Surveys;