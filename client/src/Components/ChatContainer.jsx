import React, { useEffect } from 'react'
import { Ellipsis } from 'lucide-react'

import { useChatStore } from '../Store/useChatStore'
import { useAuthStore } from '../Store/useAuthStore'
import { resetReqStatus } from '../utils/ResetReqStatus'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'

function ChatContainer() {
    const { getAllMessages, messagesReqData, messagesResStatus: { isSuccess, isError, error }, isMessageLoading, selectedUser } = useChatStore()


    const { authUser } = useAuthStore()
    const currentUser = authUser?.data?.user
    const messages = messagesReqData?.data?.messages
    console.log(messages)


    useEffect(() => {
        getAllMessages(selectedUser._id)
        resetReqStatus("messages")
    }, [selectedUser._id, getAllMessages])


    useEffect(() => {
        resetReqStatus("messages")
    }, [isSuccess, isError, error])

    if (isMessageLoading) {
        <div className="h-screen flex items-center justify-center">
            <Ellipsis size={32} className="animate-pulse" />
        </div>
    }

    const formatMessageTime = (date) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    return (
        <div className='h-full flex-1 flex flex-col '>
            <div className=''>
                <ChatHeader />
            </div>
            <div className='flex-1 overflow-y-auto p-5 '>
                {
                    messages?.map((msg) => (
                        <div key={msg._id} className={`chat ${msg.senderId?._id === currentUser?._id ? "chat-end" : "chat-start"}`}>
                            <div className="chat-image avatar">
                                <div className='w-10 rounded-full'>
                                    <img
                                        src={`${msg.senderId?._id === currentUser?._id ? currentUser?.avatar?.url : selectedUser?.avatar?.url}`}
                                        className='w-full object-cover' />
                                </div>
                            </div>
                            <div className='chat-header mb-1'>
                                <time className='text-xs opacity-50 ml-1'>{formatMessageTime(msg.createdAt)}</time>
                            </div>
                            <div className='chat-bubble flex flex-col gap-2'>
                                {
                                    msg.attachments.image && (
                                        <img
                                            src={msg.attachments.image}
                                            className='h-80 w-80 object-cover rounded-lg p-1' />
                                    )
                                }
                                {
                                    msg.attachments.videos && (
                                        <video
                                            autoPlay loop muted
                                            src={msg.attachments.video}

                                            className='h-80 object-cover rounded-lg p-1' />
                                    )
                                }
                                {
                                    msg.attachments.file && (
                                        <iframe
                                            src={msg.attachments.file}
                                            className=" h-80 w-80 rounded-lg p-1"
                                            title="PDF Viewer"
                                        />
                                    )
                                }
                                {
                                    msg.attachments.file?.endsWith('.docx') && (
                                        <iframe
                                            src={`https://docs.google.com/gview?url=${encodeURIComponent(msg.attachments.file)}&embedded=true`}
                                            className="w-full h-full rounded-lg p-1"
                                            title="DOCX Viewer"
                                        />
                                    )
                                }
                                {
                                    msg.text && <p>{msg.text}</p>
                                }
                            </div>
                        </div>
                    ))
                }

                {
                    isError && <div className='animate-pulse h-full text-xl flex items-center justify-center'>{error}</div>
                }
            </div>

            <div className=' border-t border-t-base-content/20 p-1'>
                <MessageInput />
            </div>
        </div>
    )
}

export default ChatContainer