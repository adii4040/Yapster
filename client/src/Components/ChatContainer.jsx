import React, { useEffect } from 'react'
import { Ellipsis } from 'lucide-react'

import { useChatStore } from '../Store/useChatStore'
import { resetReqStatus } from '../utils/ResetReqStatus'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'

function ChatContainer() {
    const { getAllMessages, messagesReqData, messagesResStatus: { isSuccess, isError, error }, isMessageLoading, selectedUser } = useChatStore()
    useEffect(() => {
        getAllMessages(selectedUser._id)
        resetReqStatus("messages")
    }, [selectedUser._id, getAllMessages])

    const messages = messagesReqData?.data?.messages
    // messages?.forEach(msg => {
    //     console.log(msg?.text)
    // });
    useEffect(() => {
        resetReqStatus("messages")
        if (isSuccess, messagesReqData) {
            console.log(messagesReqData?.data?.messages)
        }
        if (isError) {
            console.log(error)
        }
    }, [isSuccess, isError, error])

    if (isMessageLoading) {
        <div className="h-screen flex items-center justify-center">
            <Ellipsis size={32} className="animate-pulse" />
        </div>
    }

    return (
        <div className='h-full flex flex-col'>
            <ChatHeader />
            {/* {
                messages?.map((msg) => (
                    <p key={msg._id}>{msg.text}</p>
                ))
            } */}
            <div className='items-'>
                <MessageInput />
            </div>
        </div>
    )
}

export default ChatContainer