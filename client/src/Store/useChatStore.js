import { create } from "zustand";
import { axiosInstances } from '../lib/axios'


export const useChatStore = create((set) => ({

    selectedUser: null,

    //getMessages states
    messagesReqData: [],
    isMessageLoading: false,
    messagesResStatus: { isSuccess: false, isError: false, error: null },

    //sendMessage states
    sendMessageReqData: null,
    isMessageSending: false,
    sendMessageResStatus: { isSuccess: false, isError: false, error: null },



    getAllMessages: async (receiverId) => {
        set({ isMessageLoading: true })
        try {
            const res = await axiosInstances.get(`/message/${receiverId}/get-message`)
            const data = res.data
            set({ messagesResStatus: { isSuccess: true, isError: false, error: null }, messagesReqData: data })
        } catch (error) {
            console.error("Error in fetching the messages", error)
            set({ messageResStatus: { isSuccess: false, isError: true, error: error }, messagesReqData: null })
        } finally {
            set({ isMessageLoading: false })
        }
    },
    selectUser: (user) => {
        set({ selectedUser: user })
    },

    sendMessage: async ({ receiverId, formData }) => {
        set({ isMessageSending: true })
        try {
            const res = await axiosInstances.post(`/message/${receiverId}/send`, formData)
            const data = res.data
            set({ sendMessageResStatus: { isSuccess: true, isError: false, error: null }, sendMessageReqData: data })
        } catch (error) {
            console.error("Error in sending the messages", error)
            set({ sendMessageResStatus: { isSuccess: false, isError: true, error: error }, sendMessageReqData: null })
        } finally {
            set({ isMessageSending: false })
        }
    }
})) 