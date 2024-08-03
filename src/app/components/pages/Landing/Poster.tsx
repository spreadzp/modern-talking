'use client';
import Image from "next/image";
import React from "react";

interface PosterProps {
    title: string;
    imageUrl: any;
}

const Poster: React.FC<PosterProps> = ({ title, imageUrl }) => {
    return (
        <div className="poster p-4 bg-white bg-opacity-20 text-white">
            <div className="poster-content">
                <div className="poster-description text-white">
                    <p className="text-xl text-center">Modern Talking is a web3 application designed to facilitate surveys, voting,
                        commenting on any online resources, dataset annotation for AI models,
                        user engagement monetization, and rewarding the most active users.</p>
                    <ul className="list-disc px-4 text-left">
                        <li className="text-base">Empower Secure, transparent, and decentralized voting/survey systems.</li>
                        <li className="text-base">Incentivized user engagement platforms.</li>
                        <li className="text-base">AI dataset annotation and management.</li>
                        <li className="text-base">Reliable reward mechanisms using blockchain technology.</li>
                        <li className="text-base">Be an Early Adopter: Shape the future of NFTs with cutting-edge technology.</li>
                    </ul>
                    <p className="text-xl text-center">Join Modern Talking and be part of a pioneering SocialFi experience
                        where your voice not only matters but also earns you rewards.</p>
                </div>
                <div className="poster-image-container">
                    <Image src={imageUrl} alt={title} className="poster-image" width={1500} height={350} />
                </div>
            </div>
        </div>
    );
};

export default Poster;