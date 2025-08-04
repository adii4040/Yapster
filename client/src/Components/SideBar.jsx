import React from 'react'
import { Users } from "lucide-react";
import { useChatStore } from '../Store/useChatStore'
import { useAuthStore } from '../Store/useAuthStore'

function SideBar({ users }) {
    const { selectUser, selectedUser } = useChatStore()
    const { onlineUsers } = useAuthStore()
    return (
        <div>
            <div className='flex items-center gap-1 p-5 border-b border-base-content/10 '>
                <Users className='size-6' />
                <span className='font-medium hidden md:block'> Contacts </span>
            </div>

            <div className='w-full flex flex-col py-3 overflow-auto '>
                {
                    users?.map((user) => (
                        <button key={user._id} className={`w-full flex items-center  p-3 gap-3   ${selectedUser?._id === user._id ? "bg-base-300 " : "hover:bg-base-300"} transition-colors`} onClick={() => selectUser(user)}>
                            <div className=" w-full md:w-[25%] lg:w-[15%] relative mx-auto lg:mx-0 ">
                                <img
                                    src={user.avatar.url}
                                    alt={user.name}
                                    className="size-10 md:size-12 object-cover rounded-full"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span
                                        className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full "
                                    />
                                )}
                            </div>
                            <div className="w-[75%] hidden sm:block text-left min-w-0">
                                <div className="font-medium truncate">{user.fullname}</div>
                                <div className="text-[12px] text-zinc-400">
                                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default SideBar