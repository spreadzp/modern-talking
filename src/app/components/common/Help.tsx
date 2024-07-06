import React from 'react';
import Collaboration from '../pages/Landing/Collaboration';

const Help: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#76004f] to-[#4b4fa6] p-4">
            <div className="container mx-auto p-4 text-white">
                <h1 className="text-4xl font-bold mb-4">Help Center</h1>
                <p className="mb-4">
                    Welcome to the Modern Talking Help Center! Here, you can find answers to frequently asked questions and learn how to make the most out of our web3 application. Whether you`re a new user or a seasoned participant, this guide will help you navigate our platform effectively.
                </p>
                <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
                <ul className="list-disc pl-5 mb-4">
                    <li>
                        <strong>How do I create an account?</strong>
                        <p>To create an account, simply authenticate via Google Auth. Upon successful authentication, you will receive an ETH address for reward collection and platform interaction.</p>
                    </li>
                    <li>
                        <strong>How can I reset my password?</strong>
                        <p>Since authentication is handled through Google Auth, there is no separate password to reset. Ensure you can access your Google account to log in to Modern Talking.</p>
                    </li>
                    <li>
                        <strong>How do I earn rewards?</strong>
                        <p>You can earn rewards by participating in surveys, voting, commenting, and dataset annotation. Your contributions are tracked via smart contracts, and rewards are distributed in MDTN tokens.</p>
                    </li>
                    <li>
                        <strong>What are NFTs and how do they relate to surveys and discussions?</strong>
                        <p>NFTs (Non-Fungible Tokens) are unique digital assets that represent ownership of a specific survey, discussion, or dataset. Each NFT defines the rewards and administration rights for that content.</p>
                    </li>
                    {/* <li>
                        <strong>How do I contact customer support?</strong>
                        <p>You can reach our customer support team by sending an email to <a href="mailto:support@moderntalking.app" className="text-blue-300">support@moderntalking.app</a>. We aim to respond to all inquiries within 24 hours.</p>
                    </li> */}
                </ul>
                <h2 className="text-2xl font-bold mb-2">Need More Help?</h2>
                <p className="mb-4">
                    If you can`t find the answer to your question in our FAQ section, please feel free to contact us directly. Our support team is here to assist you!
                </p>
                <Collaboration />
            </div>
        </div>
    );
};

export default Help;