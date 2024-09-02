'use client';
import React, { useState, useEffect } from 'react';
import Poster, { PosterProps } from './Poster'; // Import PosterProps

interface FeatureSliderProps {
    items: PosterProps[];
}

const FeatureSlider: React.FC<FeatureSliderProps> = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 8000);

        return () => clearInterval(interval);
    }, [items.length]);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
        <div className="feature-slider relative text-orange-200">
            <button onClick={goToPrev} className="slider-button absolute left-0 top-1/2 transform -translate-y-1/2">
                &lt;
            </button>
            <button onClick={goToNext} className="slider-button absolute right-0 top-1/2 transform -translate-y-1/2">
                &gt;
            </button>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`slider-item ${index === currentIndex ? 'active' : ''}`}
                    style={{
                        display: index === currentIndex ? 'block' : 'none'
                    }}
                >
                    <Poster {...item} />
                </div>
            ))}
        </div>
    );
};

export default FeatureSlider;