import React, { useEffect } from 'react'
import SideBar from '../Components/SideBar'
import { useAuthStore } from '../Store/useAuthStore'
import { useChatStore } from '../Store/useChatStore'
import { resetReqStatus } from '../utils/ResetReqStatus'
import NoChatContainer from '../Components/NoChatContainer'
import ChatContainer from '../Components/ChatContainer'
import { Ellipsis } from 'lucide-react'


function Home() {
  const { getAllUser, isFetchingUser, allUserReqStatus: { isSuccess, isError, error }, allUserResData } = useAuthStore()
  const { selectedUser, subscribeToMessage, unSubscribeFromMessage } = useChatStore()

  useEffect(() => {
    getAllUser()
    
    resetReqStatus("allUser")
  }, [])

  const users = allUserResData?.data?.users

  useEffect(() => {
    if (isSuccess && allUserResData) {
      console.log(allUserResData?.data?.users)
    }

    if (isError) {
      console.log(error)
    }
  }, [isSuccess, isError, error])

  if (isFetchingUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Ellipsis size={32} className="animate-pulse" />
      </div>
    )
  }
  return (
    <div className='h-full w-full md:max-w-4xl xl:max-w-6xl mx-auto '>
      <div className='flex items-start'>
        <div className='h-[calc(100vh-64px)] bg-base w-16  md:w-[30%] border-r border-base-content/10'>
          <SideBar users={users} />
        </div>

        <div className='h-[calc(100vh-64px)] w-full md:w-[70%] '>
          {
            selectedUser ? <ChatContainer /> : <NoChatContainer />
          }
        </div>
      </div>
    </div>
  )
}

export default Home