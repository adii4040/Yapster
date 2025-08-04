import React from 'react'
import { MessageSquare } from "lucide-react";
function NoChatContainer() {
    return (
        <div className='h-full flex items-center justify-center pr-5'>
            <div className='flex flex-col items-center gap-5 text-center'>
                <span className='size-14 bg-primary/10 flex justify-center items-center rounded-lg animate-bounce'>
                    <MessageSquare className='size-7 text-primary ' />
                </span>
                <h1 className='font-bold text-2xl md:text-3xl'>Welcome to Yapster!</h1>
                <p className='font-semibold text-base-content/60 animate-pulse'>Select the conversation from the sidebar to start the chatting.</p>
            </div>
        </div>
    )
}

export default NoChatContainer