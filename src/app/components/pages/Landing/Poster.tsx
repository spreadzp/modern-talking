'use client';
import Image from "next/image";
import React from "react";

export interface PosterProps {
    title: string;
    imageUrl: any;
    description: string;
    features: string[];
    callToAction: string;
}

const Poster: React.FC<PosterProps> = ({ title, imageUrl, description, features, callToAction }) => {
    return (
        <div className="poster p-4 bg-white bg-opacity-20 text-orange-200">
            <div className="poster-content">
                <div className="poster-description ">
                    <p className="text-xl text-center">{description}</p>
                    <ul className="list-disc px-4 text-left">
                        {features.map((feature, index) => (
                            <li key={index} className="text-base">{feature}</li>
                        ))}
                    </ul>
                    <p className="text-xl text-center">{callToAction}</p>
                </div>
                <div className="poster-image-container">
                    <Image src={imageUrl} alt={title} className="poster-image" width={1500} height={350} />
                </div>
            </div>
        </div>
    );
};

export default Poster;