import React, { useEffect, useState, useRef, useCallback } from 'react'; 
import { createMessage, getMessagesByChatId } from '@/server/chat'; 
import { MessageList } from 'react-chat-elements';
import { Button, Input } from 'react-chat-elements'; 
import EditMessageModal from './EditMessageModal';
import RemoveMessageModal from './RemoveMessageModal';
import ForwardMessageModal from './ForwardMessageModal';
import { useSiteStore } from '@/app/hooks/store';
import { ContentData } from '@/app/interfaces/table.interfaces';
import Spinner from '@/app/components/shared/Spinner';

interface ChatProps {
    contentData: ContentData;
}

const Chat: React.FC<ChatProps> = ({ contentData }) => {
    const { chatMessages, setChatMessages, currentUser } = useSiteStore();
    const [inputValue, setInputValue] = useState<string>('');
    const [chatId, setChatId] = useState<number>(0);
    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showForwardModal, setShowForwardModal] = useState<boolean>(false);
    const messageListReferance = useRef<HTMLDivElement>(null);
    const inputReferance = useRef<HTMLTextAreaElement>(null);

    const getLastMessages = useCallback(() => {
        setChatMessages(contentData?.chat.messages);
        setChatId(contentData?.chat.id);
        getMessagesByChatId(contentData.chat.id, currentUser?.address)
            .then((data) => {
                if (data) {
                    setChatMessages(data);
                }
            });
    }, [setChatMessages, contentData, currentUser]);

    useEffect(() => {
        if (contentData && contentData?.chat && contentData?.chat.messages.length > 0 && currentUser) {
            getLastMessages();
        }
    }, [getLastMessages, contentData, currentUser]);

    const sendMessage = async () => {
        const ref = inputReferance.current;
        if (ref && ref.value && currentUser) {
            let currentMessage = ref.value;
            let message = {
                contentDataHash: contentData.hash,
                message: currentMessage,
                chatId: chatId,
                user: currentUser,
            };
            await createMessage(message);
            setInputValue('');
            getMessagesByChatId(chatId, currentUser?.address).then((data) => {
                if (data) {
                    setChatMessages(data);
                }
            });
            ref.value = '';
        } else {
            alert('Auth user');
        }
    };

    const handleEditMessage = (message: any) => {
        setSelectedMessage(message);
        setShowEditModal(true);
    };

    const handleRemoveMessage = (message: any) => {
        setSelectedMessage(message);
        setShowRemoveModal(true);
    };

    const handleForwardMessage = (message: any) => {
        setSelectedMessage(message);
        setShowForwardModal(true);
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                {chatMessages.length === 0 ? <Spinner /> : <MessageList
                    referance={messageListReferance}
                    className='message-list text-black'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={chatMessages}
                    onReplyMessageClick={handleEditMessage}
                    onRemoveMessageClick={handleRemoveMessage}
                    onForwardClick={handleForwardMessage}
                />}

                <Input
                    referance={inputReferance}
                    placeholder='Type here...'
                    multiline={true}
                    value={inputValue} maxHeight={200}
                    rightButtons={<Button color='white' backgroundColor='blue' text='Send' onClick={sendMessage} />}
                />

                {showEditModal && (
                    <EditMessageModal
                        message={selectedMessage}
                        onClose={() => setShowEditModal(false)}
                        onSave={(editedMessage: string) => {
                            // Update message in chatMessages
                            setShowEditModal(false);
                        }}
                    />
                )}
                {showRemoveModal && (
                    <RemoveMessageModal
                        message={selectedMessage}
                        onClose={() => setShowRemoveModal(false)}
                        onRemove={() => {
                            // Remove message from chatMessages
                            setShowRemoveModal(false);
                        }}
                    />
                )}
                {showForwardModal && (
                    <ForwardMessageModal
                        message={selectedMessage}
                        onClose={() => setShowForwardModal(false)}
                        onSend={(newMessage: any) => {
                            // Add new message with selected address
                            setShowForwardModal(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Chat;