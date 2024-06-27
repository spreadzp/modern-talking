'use client'
import DiscussionComponent from '../../components/Discussion';
import { usePathname} from 'next/navigation'
import { useEffect, useState } from 'react';
import { useSiteStore } from '@/app/hooks/store'; 
 

const DiscussionPage = () => { 
    return <DiscussionComponent  />;
};

export default DiscussionPage;