import { create } from "zustand";
import { axiosInstances } from '../lib/axios'


export const useChatStore = create((set) => ({

    selectedUser: null,

    messagesReqData: [],
    isMessageLoading: false,
    messageResStatus: { isSuccess: false, isError: false, error: null },


    getAllMessages: async (receiverId) => {
        set({ isMessageLoading: true })
        try {
            const res = await axiosInstances.get(`/message/${receiverId}/get-message`)
            const data = res.data
            set({ messageResStatus: { isSuccess: true, isError: false, error: null }, messagesReqData: data })
        } catch (error) {
            console.error("Error in fetching the messages", error)
            set({ messageResStatus: { isSuccess: false, isError: true, error: error }, messagesReqData: null })
        } finally {
            set({ isMessageLoading: false })
        }
    },
    selectUser: (user) => {
        set({ selectedUser: user })
    }
})) 