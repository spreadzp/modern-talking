import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createMessage, getMessagesByChatId, removeMessageById } from '@/server/chat';
import { MessageList } from 'react-chat-elements';
import { Button, Input } from 'react-chat-elements';
import EditMessageModal from './EditMessageModal';
import RemoveMessageModal from './RemoveMessageModal';
import ForwardMessageModal from './ForwardMessageModal';
import { useSiteStore } from '@/app/hooks/store';
import { ContentData } from '@/app/interfaces/table.interfaces';
import Spinner from '@/app/components/shared/Spinner';
import ReplyMessageModal from './ReplyMessageModal';

interface ChatProps {
    contentData: ContentData;
}

const Chat: React.FC<ChatProps> = ({ contentData }) => {
    const { chatMessages, setChatMessages, currentUser, userAddressWallet } = useSiteStore();
    const [inputValue, setInputValue] = useState<string>('');
    const [chatId, setChatId] = useState<number>(0);
    const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showReplyModal, setShowReplyModal] = useState<boolean>(false);
    const [ownerAddress, setOwnerAddress] = useState('')

    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showForwardModal, setShowForwardModal] = useState<boolean>(false);
    const messageListReference = useRef<HTMLDivElement>(null);
    const inputReference = useRef<HTMLTextAreaElement>(null);

    const getLastMessages = useCallback(() => {
        if (contentData.owner) {
            setOwnerAddress(contentData.owner.address)
        }
        setChatMessages(contentData?.chat.messages);
        setChatId(contentData?.chat.id);
        getMessagesByChatId(contentData.chat.id, currentUser?.address, ownerAddress)
            .then((data) => {
                if (data) {
                    setChatMessages(data);
                }
            });
    }, [setChatMessages, contentData, currentUser, ownerAddress]);

    useEffect(() => {
        if (contentData && contentData?.chat && contentData?.chat.messages.length > 0 && currentUser) {
            getLastMessages();
        }
    }, [getLastMessages, contentData, currentUser]);

    const sendMessage = async () => {
        debugger
        const ref = inputReference.current;
        if (ref && ref.value && currentUser) {
            let currentMessage = ref.value;
            let message = {
                contentDataHash: contentData.hash,
                message: currentMessage,
                chatId: chatId,
                user: currentUser,
            };
            console.log('contentData :>>', contentData)
            await createMessage(message, contentData.resourceType);
            setInputValue('');
            getMessagesByChatId(chatId, currentUser?.address, ownerAddress).then((data) => {
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
        console.log("🚀 ~ handleEditMessage ~ message:", message)
        setSelectedMessage(message);
        setShowEditModal(true);
    };

    const handleReplyMessage = (message: any) => {
        setSelectedMessage(message);
        setShowReplyModal(true);
    };
    const handleRemoveMessage = (message: any) => {
        setSelectedMessage(message);
        setShowRemoveModal(true);
    };

    const handleOnSave = (messageToSave: string) => {
        if (messageToSave) {
            let message = {
                contentDataHash: contentData.hash,
                message: messageToSave,
                chatId: chatId,
                user: currentUser,
            };
            createMessage(message, contentData.resourceType);
            getMessagesByChatId(chatId, currentUser?.address, ownerAddress).then((data) => {
                if (data) {
                    setChatMessages(data);
                }
            });
        }
    }

    const handleOnRemove = (selectedMessage: any) => {
        if (selectedMessage) {
            console.log("🚀 ~ handleOnRemove ~ selectedMessage:", selectedMessage)
            removeMessageById(selectedMessage.id);
            getMessagesByChatId(chatId, currentUser?.address, ownerAddress).then((data) => {
                if (data) {
                    setChatMessages(data);
                }
            });
        }
    }
    const handleForwardMessage = (message: any) => {
        setSelectedMessage(message);
        setShowForwardModal(true);
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                {/* {ownerAddress && <h3> Owner: {ownerAddress}</h3>} */}
                {chatMessages.length === 0 ? <Spinner text='Loading messages...' /> : <MessageList
                    referance={messageListReference}
                    className='message-list text-black'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={chatMessages}
                    onReplyClick={handleReplyMessage}
                    onContextMenu={handleEditMessage}
                    onRemoveMessageClick={handleRemoveMessage}
                // onForwardClick={handleForwardMessage}
                />}

                <Input
                    referance={inputReference}
                    placeholder='Type here...'
                    multiline={true}
                    value={inputValue} maxHeight={200}
                    rightButtons={<Button color='yellow' backgroundColor='blue' text='Send' onClick={sendMessage} />}
                />

                {showEditModal && (
                    <EditMessageModal
                        message={selectedMessage}
                        onClose={() => setShowEditModal(false)}
                        onSave={(editedMessage: string) => {
                            console.log("🚀 ~ editedMessage:", editedMessage)
                            handleOnSave(editedMessage);
                            setShowEditModal(false);
                        }}
                    />
                )}
                {showReplyModal && (
                    <ReplyMessageModal
                        message={selectedMessage}
                        onClose={() => setShowReplyModal(false)}
                        onSave={(message: string) => {
                            console.log("🚀 ~ editedMessage:", message)
                            handleOnSave(message);
                            setShowReplyModal(false);
                        }}
                    />
                )}
                {showRemoveModal && (
                    <RemoveMessageModal
                        message={selectedMessage}
                        onClose={() => setShowRemoveModal(false)}
                        onRemove={(message: any) => {
                            handleOnRemove(message)
                            setShowRemoveModal(false);
                        }}
                    />
                )}
                {showForwardModal && (
                    <ForwardMessageModal
                        message={selectedMessage}
                        onClose={() => setShowForwardModal(false)}
                        onSend={(newMessage: any) => {
                            console.log("🚀 ~ newMessage:", newMessage)
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