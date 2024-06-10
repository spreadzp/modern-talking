'use client'
import DiscussionComponent from '../../components/Discussion';
import { usePathname} from 'next/navigation'
import { useEffect } from 'react';
import { useSiteStore } from '@/app/hooks/store';
 

const DiscussionPage = () => {
    const {discussionData, setDiscussionData, discussionsData} = useSiteStore()
    const pathname = usePathname() 
    useEffect(() => {  
        const hash = pathname.split('/')[2];
        const data = discussionsData.find(data => data.hash === hash) 
        if (data) {
            setDiscussionData(data)
        } 
    }, [pathname])



    if (!discussionData) {
        // Handle the case where the discussion data is not found
        return <div>Discussion not found</div>;
    }

    return <DiscussionComponent discussion={discussionData} />;
};

export default DiscussionPage;