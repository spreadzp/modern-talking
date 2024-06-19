// src/components/RightSide.tsx
import React, { useEffect, useState } from 'react';
import { DiscussionData } from '../interfaces/table.interfaces';
import { createMessage, getMessagesByChatId } from '@/server/chat';
import { useSiteStore } from '../hooks/store';
import { MessageBox } from 'react-chat-elements'
import { MessageList } from 'react-chat-elements'
import { Navbar, Avatar, Popup, Button, Input } from 'react-chat-elements'
import Spinner from './Spinner';



interface ChatProps {
    discussion: DiscussionData;
}

const Chat: React.FC<ChatProps> = ({ discussion }) => {
    const [showPopup, setShowPopup] = useState(false)
    const { chatMessages, setChatMessages, currentUser, discussionData } = useSiteStore()
    const [inputValue, setInputValue] = useState('');
    const [chatId, setChatId] = useState(0)
    const messageListReferance = React.createRef();
    const inputReferance = React.createRef()
    const item = {
        position: 'right',
        type: 'text',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        date: new Date(),
    }
    useEffect(() => {
        console.log('discussion :>>', discussion)
        if (discussion && discussion.chatMessages) {
            setChatId(discussion.chatMessages?.id)
        }
    }, [discussion]);
    useEffect(() => {
        if (chatId) { // TODO update messages
            if(currentUser) {
                getMessagesByChatId(chatId, currentUser?.address)
                .then((data) => {
                    if (data) {
                        setChatMessages(data)
                    }
                })
            }
            
        }
    }, [chatId, setChatMessages, currentUser]);


    useEffect(() => {

        console.log("🚀 ~ useEffect ~ chatMessages:", chatMessages)
    }, [chatMessages]);
    
    const inputClear = () => { }

    const sendMessage = async () => {
        if(inputReferance) {
            let currentMessage = inputReferance.current.value
            let message: any = {
                discussionHash: discussionData.hash,
                message: currentMessage,
                chatId: chatId,
                user: currentUser,
    
    
            }
            const messageSaved = await createMessage(message)
            console.log("🚀 ~ handleSubmit ~ messageSaved:", messageSaved)
            setInputValue('');
            if(currentUser) {
                getMessagesByChatId(chatId, currentUser?.address)
                .then((data) => {
                    console.log("🚀 ~ .then ~ data:", data)
                    if (data) {
                        setChatMessages(data)
                    }
                })
            }
        } 
        
        inputReferance.current.value = null
    }
    return (
        <div> {<div className="w-full   md:pl-4 md:mr-4 flex flex-col ">

            {chatMessages.length === 0 ? <Spinner /> : <MessageList
                referance={messageListReferance}
                className='message-list text-black'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={chatMessages

                } />}


            <Input
                referance={inputReferance}
                placeholder='Type here...'
                multiline={true}
                value={inputValue} maxHeight={200}
                rightButtons={<Button color='white' backgroundColor='blue' text='Send' onClick={() => sendMessage()} />}
            />
            {/* <Button className='text-black' text={'click me!'} onClick={() => sendMessage()} /> */}

        </div>}</div>
    );
};

export default Chat;


// <Avatar src={'https://facebook.github.io/react/img/logo.svg'} alt={'logo'} size='large' type='circle flexible' />
// <Navbar className='text-black' left={<div>'LEFT' area</div>} center={<div>'CENTER' area</div>} right={<div>'RIGHT' area</div>} />
// <Popup
//     show={showPopup}
//     header='Lorem ipsum dolor sit amet.'
//     headerButtons={[
//         {
//             type: 'transparent',
//             color: 'black',
//             text: 'close',
//             onClick: () => {
//                 setShowPopup(false)
//             },
//         },
//     ]}
//     text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem animi veniam voluptas eius!'
//     footerButtons={[
//         {
//             color: 'white',
//             backgroundColor: '#ff5e3e',
//             text: 'Vazgeç',
//         },
//         {
//             color: 'white',
//             backgroundColor: 'lightgreen',
//             text: 'Tamam',
//         },
//     ]}
// />