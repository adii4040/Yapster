import { create } from 'zustand'
import { axiosInstances } from '../Components/lib/axios'

export const useAuthStore = create((set) => ({
    authUserData: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isUpdatingPassword: false,
    isFetchingCurrentUser: true,

    getCurrentUser: async () => {
        try {
            const res = await axiosInstances.get('/user/current-user')
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data)
            } else {
                set({ authUserData: data })
            }
        } catch (error) {
            console.error('Error while fetcing the user', error)
            set({ authUserData: null })
        } finally {
            set({ isFetchingCurrentUser: false })
        }
    },
    
}))