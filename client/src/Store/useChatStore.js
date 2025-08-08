import { create } from "zustand";
import { axiosInstances } from '../lib/axios'
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create((set, get) => ({

    selectedUser: null,

    //getMessages states
    messagesReqData: [],
    isMessageLoading: false,
    messagesResStatus: { isSuccess: false, isError: false, error: null },

    //sendMessage states
    isMessageSending: false,
    sendMessageResStatus: { isSuccess: false, isError: false, error: null },



    getAllMessages: async (receiverId) => {
        set({ isMessageLoading: true })
        try {
            const res = await axiosInstances.get(`/message/${receiverId}/get-message`)
            const data = res.data
            console.log(data.data.messages)
            set({ messagesResStatus: { isSuccess: true, isError: false, error: null }, messagesReqData: Array.isArray(data.data.messages) ? data.data.messages : [] })
        } catch (error) {
            console.error("Error in fetching the messages", error.response.data.message)
            set({ messagesResStatus: { isSuccess: false, isError: true, error: error.response.data.message }, messagesReqData: null })
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
            console.log(data.data.message)
            set((state) => ({ sendMessageResStatus: { isSuccess: true, isError: false, error: null }, messagesReqData: [...(state.messagesReqData || []), data.data.message] }))
        } catch (error) {
            console.error("Error in sending the messages", error)
            set({ sendMessageResStatus: { isSuccess: false, isError: true, error: error } })
        } finally {
            set({ isMessageSending: false })
        }
    },

    subscribeToMessage: () => {
        const { selectedUser } = get()
        if (!selectedUser) return;


        const socket = useAuthStore.getState().socket
        socket.off("newMessage")

        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId._id !== selectedUser._id) return

            set((state) => ({
                messagesReqData: [...state.messagesReqData, newMessage]
            }))
            console.log("📨 New message received via socket:", newMessage);
        })
    },
    unSubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    }

})) 