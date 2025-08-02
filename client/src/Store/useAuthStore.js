import { create } from 'zustand'
import { axiosInstances } from '../Components/lib/axios'

export const useAuthStore = create((set) => ({
    isUpdatingProfile: false,
    isUpdatingPassword: false,

    //currentUser states
    authUser: null,
    isFetchingCurrentUser: true,
    getCurrentUserStatus: { isSuccess: false, isError: false, error: null },

    //signup user states
    registerResData: null,
    isSigningUp: false,
    registerUserStatus: { isSuccess: false, isError: false, error: null },

    //login user states
    isLoggingIn: false,
    loginUserStatus: { isSuccess: false, isError: false, error: null },

    //forgetPasswordReq states
    forgetPasswordReqResData: null,
    isEmailVerifying: false,
    forgetPasswordReqStatus: { isSuccess: false, isError: false, error: null },

    //resetForgetPassword states
    resetForgetPasswordResData: null,
    isResettingForgetPassword: false,
    resetForgetPasswordReqStatus: { isSuccess: false, isError: false, error: null },



    getCurrentUser: async () => {
        try {
            const res = await axiosInstances.get('/user/current-user')
            const data = await res.data
            set({ getComputedStyle: { isSuccess: true, isError: false, error: null }, authUser: data })
        } catch (error) {
            console.error('Error while fetcing the user', error.response.data)
            set({ getComputedStyle: { isSuccess: false, isError: true, error: error.response.data }, authUser: null })

        } finally {
            set({ isFetchingCurrentUser: false })
        }
    },

    registerUser: async (forData) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstances.post("/user/register", forData)
            const data = await res.data

            set({ registerUserStatus: { isSuccess: true, isError: false, error: null }, registerResData: data })

        } catch (error) {
            console.error('Error while registering the user', error?.response?.data?.message)
            set({ registerUserStatus: { isSuccess: false, isError: true, error: error?.response?.data?.message }, registerResData: error?.response?.data?.message })

        } finally {
            set({ isSigningUp: false })
        }
    },

    loginUser: async (formData) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstances.post("/user/login", formData)
            const data = await res.data
            set({ loginUserStatus: { isSuccess: true, isError: false, error: null }, authUser: data })
        } catch (error) {
            console.error('Error while logging in the user', error?.response?.data?.message)
            set({ loginUserStatus: { isSuccess: false, isError: true, error: error?.response?.data?.message }, authUser: null })
        } finally {
            set({ isLoggingIn: false })
        }
    },

    logoutUser: async () => {
        try {
            const res = await axiosInstances.post("/user/logout")
            set({ authUser: null })
        } catch (error) {
            set({ loginUserStatus: { isSuccess: true, isError: false, error: error?.response?.data?.message } })
        }
    },

    forgetPasswordRequest: async (formData) => {
        set({ isEmailVerifying: true })
        try {
            const res = await axiosInstances.post("/user/request-forgot-password", formData)
            const data = await res.data
            set({ forgetPasswordReqStatus: { isSuccess: true, isError: false, error: null }, forgetPasswordReqResData: data })
        } catch (error) {
            set({ forgetPasswordReqStatus: { isSuccess: false, isError: true, error: error?.response?.data?.message }, forgetPasswordReqResData: null })
        } finally {
            set({ isEmailVerifying: false })
        }
    },

    resetForgetPassword: async ({ formData, tokenId }) => {
        set({ isResettingForgetPassword: true })
        try {
            const res = await axiosInstances.put(`/user/${tokenId}/reset-forgot-password`, formData)
            const data = await res.data
            set({ resetForgetPasswordReqStatus: { isSuccess: true, isError: false, error: null }, resetForgetPasswordResData: data })
        } catch (error) {
            set({ resetForgetPasswordReqStatus: { isSuccess: false, isError: true, error: error?.response?.data?.message }, resetForgetPasswordResData: null })
        } finally {
            set({ isResettingForgetPassword: false })
        }
    }
}))