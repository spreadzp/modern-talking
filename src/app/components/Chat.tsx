import React, { useEffect, useState, useRef, useCallback } from 'react';
import { ContentData } from '../interfaces/table.interfaces';
import { createMessage, getMessagesByChatId } from '@/server/chat';
import { useSiteStore } from '../hooks/store';
import { MessageList } from 'react-chat-elements'
import { Button, Input } from 'react-chat-elements'
import Spinner from './Spinner';

interface ChatProps {
    contentData: ContentData;
}

const Chat: React.FC<ChatProps> = ({ contentData }) => {
    const { chatMessages, setChatMessages, currentUser } = useSiteStore()
    const [inputValue, setInputValue] = useState('');
    const [chatId, setChatId] = useState(0)
    const messageListReferance = useRef<HTMLDivElement>(null);
    const inputReferance = useRef<HTMLTextAreaElement>(null);



    const getLastMessages = useCallback(() => {
        setChatMessages(contentData?.chat.messages)
        setChatId(contentData?.chat.id)
        getMessagesByChatId(contentData.chat.id, currentUser?.address)
            .then((data) => {
                console.log("🚀 ~ .then ~ data:", data)
                if (data) {
                    setChatMessages(data)
                }
            })
    }, [setChatMessages, contentData, currentUser]);
    useEffect(() => {
        console.log('contentData :>>', contentData)
        if (contentData && contentData?.chat && contentData?.chat.messages.length > 0 && currentUser) {
            getLastMessages()
        }
    }, [getLastMessages, contentData, currentUser]);


    const sendMessage = async () => {
        debugger
        const ref = inputReferance.current;
        if (ref && ref.value && currentUser) {
            let currentMessage = ref.value;
            if (inputReferance.current) {
                let message: any = {
                    contentDataHash: contentData.hash,
                    message: currentMessage,
                    chatId: chatId,
                    user: currentUser,
                }
                const messageSaved = await createMessage(message)
                console.log("🚀 ~ handleSubmit ~ messageSaved:", messageSaved)
                setInputValue('');
                if (currentUser) {
                    getMessagesByChatId(chatId, currentUser?.address)
                        .then((data) => {
                            console.log("🚀 ~ .then ~ data:", data)
                            if (data) {
                                setChatMessages(data)
                            }
                        })
                }
            }
            ref.value = '';
        } else {
            alert('Auth user')
        }
    }

    return (
        <div>
            <div className="w-full md:pl-4 md:mr-4 flex flex-col ">
                {chatMessages.length === 0 ? <Spinner /> : <MessageList
                    referance={messageListReferance}
                    className='message-list text-black'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={chatMessages} />}

                <Input
                    referance={inputReferance}
                    placeholder='Type here...'
                    multiline={true}
                    value={inputValue} maxHeight={200}
                    rightButtons={<Button color='white' backgroundColor='blue' text='Send' onClick={() => sendMessage()} />}
                />
            </div>
        </div>
    );
};

export default Chat;