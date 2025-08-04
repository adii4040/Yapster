import { create } from 'zustand'
import { axiosInstances } from '../lib/axios'

export const useAuthStore = create((set) => ({

    isUpdatingPassword: false,
    onlineUsers: [],
    //currentUser states
    authUser: null,
    isFetchingCurrentUser: true,
    getCurrentUserReqStatus: { isSuccess: false, isError: false, error: null },

    //signup user states
    registerResData: null,
    isSigningUp: false,
    registerUserReqStatus: { isSuccess: false, isError: false, error: null },

    //login user states
    isLoggingIn: false,
    loginUserReqStatus: { isSuccess: false, isError: false, error: null },

    //forgetPasswordReq states
    forgetPasswordReqResData: null,
    isEmailVerifying: false,
    forgetPasswordReqStatus: { isSuccess: false, isError: false, error: null },

    //resetForgetPassword states
    resetForgetPasswordResData: null,
    isResettingForgetPassword: false,
    resetForgetPasswordReqStatus: { isSuccess: false, isError: false, error: null },

    //updateuser states
    updateUserResData: null,
    isUpdatingProfile: false,
    updateUserReqStatus: { isSuccess: false, isError: false, error: null },

    //VerifyEmail states
    isVerifying: false,
    verifyEmailResData: null,
    verifyEmailReqStatus: { isSuccess: false, isError: false, error: null },


    //ResendEmailVerificationToken states
    resendEmailVerificationTokenResData: null,
    resendEmailVerificationTokenReqStatus: { isSuccess: false, isError: false, error: null },


    //GetAllUsers states
    allUserResData: [],
    isFetchingUser: false,
    allUserReqStatus: { isSuccess: false, isError: false, error: null },
    

    getCurrentUser: async () => {
        try {
            const res = await axiosInstances.get('/user/current-user')
            const data = await res.data
            set({ getCurrentUserReqStatus: { isSuccess: true, isError: false, error: null }, authUser: data })
        } catch (error) {
            console.error('Error while fetcing the user', error.response.data)
            set({ getCurrentUserReqStatus: { isSuccess: false, isError: true, error: error.response.data }, authUser: null })

        } finally {
            set({ isFetchingCurrentUser: false })
        }
    },

    registerUser: async (forData) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstances.post("/user/register", forData)
            const data = await res.data

            set({ registerUserReqStatus: { isSuccess: true, isError: false, error: null }, registerResData: data })

        } catch (error) {
            console.error('Error while registering the user', error?.response?.data?.message)
            set({ registerUserReqStatus: { isSuccess: false, isError: true, error: error?.response?.data?.message }, registerResData: error?.response?.data?.message })

        } finally {
            set({ isSigningUp: false })
        }
    },

    loginUser: async (formData) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstances.post("/user/login", formData)
            const data = await res.data
            set({ loginUserReqStatus: { isSuccess: true, isError: false, error: null }, authUser: data })
        } catch (error) {
            console.error('Error while logging in the user', error?.response?.data?.message)
            set({ loginUserReqStatus: { isSuccess: false, isError: true, error: error?.response?.data?.message }, authUser: null })
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
    },

    updateUser: async ({ formData, userId }) => {
        set({ isUpdatingProfile: true })

        console.log("bahar")
        try {
            const res = await axiosInstances.put(`/user/${userId}/update`, formData)
            const data = res.data
            console.log("updating")
            set({ updateUserReqStatus: { isSuccess: true, isError: false, error: null }, updateUserResData: data })
        } catch (error) {
            console.error("Error while updating the user", error?.response?.data?.message)
            set({ updateUserReqStatus: { isSuccess: false, isError: true, error: error?.response?.data?.message }, updateUserResData: null })
        } finally {
            set({ isUpdatingProfile: false })
        }

    },

    verifyEmail: async ({ userId, emailVerificationToken }) => {
        set({ isVerifying: true })
        try {
            const res = await axiosInstances.get(`/user/${userId}/verify-email/${emailVerificationToken}`)
            const data = res.data
            set({ verifyEmailReqStatus: { isSuccess: true, isError: false, error: null }, verifyEmailResData: data })
        } catch (error) {
            console.error("Error while verifying the email", error?.response?.data?.message)
            set({ updateUserReqStatus: { isSuccess: false, isError: true, error: error?.response?.data?.message } })
        } finally {
            set({ isVerifying: false })
        }
    },

    resendEmailVerificationToken: async () => {
        try {
            const res = axiosInstances.post('/user/resend-email-verification')
            const data = res.data
            set({ resendEmailVerificationTokenReqStatus: { isSuccess: true, isError: false, error: null }, resendEmailVerificationTokenResData: data })
        } catch (error) {
            console.error("Error while sending the email verification link", error)
            set({ resendEmailVerificationTokenReqStatus: { isSuccess: false, isError: true, error: error } })
        }
    },

    getAllUser: async () => {
        set({isFetchingUser: true})
        try {
            const res = await axiosInstances.get("/user/all-users")
            const data = res.data
            set({allUserReqStatus: { isSuccess: true, isError: false, error: null }, allUserResData: data})
        } catch (error) {
            console.error("Error while fetching the all users", error)
            set({allUserReqStatus: { isSuccess: false, isError: true, error: error }, allUserResData: null})
        } finally {
            set({isFetchingUser: false})
        }
    }
}))