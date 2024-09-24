import React from 'react';
import Collaboration from '../pages/Landing/Collaboration';

const About: React.FC = () => {
    return (
        <>
            <div className="min-h-screen ">
                <div className="container mx-auto p-4 text-white">
                    <h1 className="text-4xl font-bold mb-4">About Modern Talking</h1>
                    <p className="mb-4">
                        Modern Talking is a pioneering web3 application designed to revolutionize user engagement and monetization across various online activities. Our platform enables users to participate in surveys, voting, commenting, dataset annotation for AI models, and more, all while earning rewards through blockchain technology.
                    </p>
                    <p className="mb-4">
                        Our mission is to create a secure, transparent, and decentralized environment where users can not only express their opinions but also be fairly compensated for their contributions. We aim to empower individuals and businesses by providing tools that enhance collaboration and data integrity.
                    </p>
                    <h2 className="text-2xl font-bold mb-2">Core Features</h2>
                    <ul className="list-disc pl-5 mb-4">
                        <li>User Authentication via Google Auth</li>
                        <li>Content Creation and Interaction</li>
                        <li>NFT Integration for Reward and Rights Management</li>
                        <li>Smart Contract-Based Reward System</li>
                        <li>AI Content Analysis for Quality Control</li>
                        <li>Token Swap and Decentralized Exchange (DEX) Integration</li>
                    </ul>
                    <h2 className="text-2xl font-bold mb-2">Our Business Model</h2>
                    <p className="mb-4">
                        Our revenue streams include NFT sales, royalties from NFT resales, airdrop commissions, and transaction fees on MDTN token swaps. This model not only supports the platform`s sustainability but also incentivizes active participation and the creation of high-quality content.
                    </p>
                    <h2 className="text-2xl font-bold mb-2">Our Team</h2>
                    <p className="mb-4">
                        Our team is composed of blockchain experts, AI developers, and community managers who are passionate about driving innovation in the web3 space. We are committed to maintaining the highest standards of security, user experience, and ethical practices.
                    </p>
                    <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                    <Collaboration />
                </div>
            </div>
        </>

    );
};

export default About;