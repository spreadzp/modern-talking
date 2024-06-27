import { Discussion } from "@prisma/client";
import { useEffect, useState } from "react"; 
import { createHashForPrivateKeyFromString } from "../hooks/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Discussion) => void;
    nameSubmit: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, nameSubmit }) => {
    const [hash, setHash] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const [description, setDescription] = useState('');
    const [prompt, setPrompt] = useState('');
    const [topic, setTopic] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const identity = createHashForPrivateKeyFromString(sourceUrl) 
        console.log("🚀 ~ handleSubmit ~ identity:", identity)
        setHash(identity?.address as string)
        if( hash && sourceUrl && description && prompt && topic) {
            const newDiscussion: any = {
                hash,
                sourceUrl,
                description,
                prompt,
                topic,
                // rewards: [], // Assuming you handle rewards separately or as an empty array initially
                // chat: null, // Assuming chat is nullable and initialized as null
                createdAt: new Date(),
                updatedAt: new Date()
            };
            onSubmit(newDiscussion);
            onClose();
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
            <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>

            <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-50">
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Create Discussion</p>
                        <div className="modal-close cursor-pointer z-50" onClick={onClose}>
                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                            </svg>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* {hash !== '' && <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="hash">
                                Hash
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="hash" type="text" value={hash}  />
                        </div>} */}
                        {/* Add similar input fields for sourceUrl, description, prompt, and topic */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="sourceUrl">
                                Source URL
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="sourceUrl" type="text" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="description">
                                Description
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="prompt">
                                Prompt
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="prompt" type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="topic">
                                Topic
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="topic" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded shadow hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                {`${nameSubmit}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};