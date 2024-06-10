// src/components/RightSide.tsx
import React, { useEffect, useState } from 'react';
import { DiscussionData } from '../interfaces/table.interfaces';
import { createMessage, getMessagesByChatId } from '@/server/chat';
import { Message } from '@prisma/client';
import { useSiteStore } from '../hooks/store';



interface ChatProps {
    discussion: DiscussionData;
}

const Chat: React.FC<ChatProps> = ({ discussion }) => {
    const { chatMessages, setChatMessages } = useSiteStore()
    const [inputValue, setInputValue] = useState('');
    const [chatId, setChatId] = useState(0)
    useEffect(() => {
        if (discussion && discussion.chat) {
            setChatId(discussion.chat?.id)
        }
    }, [discussion]);
    useEffect(() => {

        if (chatId) { // TODO update messages
            getMessagesByChatId(chatId)
                .then((data) => {
                    if (data) {
                        setChatMessages(data.messages)
                    }
                })
        }
    }, [chatId]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setChatMessages((prevMessages) => [
        //     ...prevMessages,
        //     { id: prevMessages.length, message: inputValue },
        // ]);

        let message: any = {
            message: inputValue,
            chatId: discussion.chat?.id,
            userId: 1,


        }
        const messageSaved = await createMessage(message)
        console.log("🚀 ~ handleSubmit ~ messageSaved:", messageSaved)
        setInputValue('');
        getMessagesByChatId(chatId)
                .then((data) => {
                    if (data) {
                        setChatMessages(data.messages)
                    }
                })
    };

    return (
        <div className="w-full   md:pl-4 md:mr-4 flex flex-col "> 
            <div className="flex-grow overflow-y-auto mb-2 p-2">
                {chatMessages?.map((message) => (
                    <p key={message.id} className="mb-1">{message.message}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full p-2 mr-2 border border-gray-300 rounded text-black"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;