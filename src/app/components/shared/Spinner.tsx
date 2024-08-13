'use client'

import React, { useState, useEffect } from 'react';

const Spinner = ({ text = "Loading..." }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let increasing = true;
        let index = 0;
        const interval = setInterval(() => {
            if (increasing) {
                setDisplayText(text.slice(0, index + 1));
                index++;
                if (index === text.length) {
                    increasing = false;
                }
            } else {
                setDisplayText(text.slice(0, index));
                index--;
                if (index === -1) {
                    increasing = true;
                }
            }
        }, 100); 

        return () => clearInterval(interval);
    }, [text]);

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
            <div className="mt-4 text-lg text-purple-500">{displayText}</div>
        </div>
    );
};

export default Spinner;