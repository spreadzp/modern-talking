'use client'
import { usePathname} from 'next/navigation'
import { useEffect } from 'react';
import { useSiteStore } from '@/app/hooks/store';
import Survey from '@/app/components/Survey';
 

const SurveyPage = () => {
    // const {surveyData, setSurveyData, surveysData} = useSiteStore()
    // const pathname = usePathname() 
    // useEffect(() => {  
    //     const hash = pathname.split('/')[2];
    //     const data = surveysData.find(data => data.hash === hash) 
    //     if (data) {
    //         setSurveyData(data)
    //     } 
    // }, [pathname, setSurveyData, surveysData]);



    // if (!surveyData) { 
    //     return <div>Survey not found</div>;
    // }

    return <Survey   />;
};

export default SurveyPage;