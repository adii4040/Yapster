import React from 'react'
import { MessageCircleX } from 'lucide-react'
import { useAuthStore } from '../Store/useAuthStore'
import { useChatStore } from '../Store/useChatStore'

function ChatHeader() {
    const { onlineUsers } = useAuthStore()
    const {selectedUser, selectUser} = useChatStore()
    return (
        <div className='h-16 flex items-center justify-between gap-1 p-5 border-b border-base-content/10' >
            {/*-----User Info----*/}
            <div className='flex items-center gap-2 '>
                <div className='size-10 rounded-full'>
                    <img src={selectedUser?.avatar?.url} alt="" className='w-full h-full rounded-full object-cover' />
                </div>
                <div>
                    <h1 className='font-medium truncate'>{selectedUser?.fullname}</h1>
                    <span className='text-[12px] text-zinc-400'>
                        {
                            onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"
                        }
                    </span>
                </div>
            </div>
            <div className='group relative'>
                <div>
                    <MessageCircleX className='size-5 ' onClick={() => selectUser(null) }/>
                </div>
                <p className='absolute w-[90px] text-[10px] text-base-300 bg-base-content px-0.5 -top-5 -right-16 hidden lg:group-hover:block'>Close Conversation</p>
            </div>
        </div>
    )
}

export default ChatHeader