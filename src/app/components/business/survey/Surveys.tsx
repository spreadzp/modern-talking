
import ExpandableContent from '../../shared/ExpandableTable';
import SurveyTable from './SurveyTable';

const Surveys: React.FC = () => {
    return (
        <>
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