'use client';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import * as React from 'react'; 

export function Providers({ children  }: { children: React.ReactNode  }) { 
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    return (
        <div>  
            <div className="flex flex-col items-start justify-between bg-gradient-to-b from-[#76004f] to-[#0d010e] ">
                <Header />
            </div>
            <div >
            {mounted && children}
            </div> 
            <Footer /> 
        </div>
    );
}
