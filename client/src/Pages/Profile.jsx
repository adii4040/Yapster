import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { Mail, User, UserRoundPen } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify'
import {resetReqStatus} from '../utils/ResetReqStatus' 
const Profile = () => {
  const navigate = useNavigate()
  const { getCurrentUser, authUser, resendEmailVerificationToken, resendEmailVerificationTokenResData, resendEmailVerificationTokenReqStatus: { isSuccess, isError, error }, isVerifying } = useAuthStore();
  const currentUser = authUser?.data?.user

  const resendVerifyLink = () => {
    console.log("verify")
    resendEmailVerificationToken()
    console.log(resendEmailVerificationTokenResData)
  }


  useEffect(() => {
    getCurrentUser()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      toast.success("Verification link sent.")
      resetReqStatus("resendEmailVerificationToken")
    }
    if (isError) {
      alert("Error")
    }
  }, [isError,isSuccess])


  return (
    <div className="lg:h-[80%] pt-2">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-1">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={currentUser?.avatar?.url || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />

              <div
                className="absolute p-2  rounded-full bottom-0 right-2 bg-base-content hover:scale-105 hover:bg-base-300 hover:border cursor-pointer group
                  transition-all duration-200"
                onClick={() => navigate(`/user/${currentUser?._id}/update`)}>
                <UserRoundPen className="size-6 text-base-300 group-hover:text-base-content" />
                <span className={`absolute -right-20 bottom-5 text-sm hidden group-hover:block`}>Edit Profile</span>
              </div>
            </div>
          </div>

          <div className="space-y-7">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{currentUser?.fullname}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{currentUser?.email}</p>
            </div>

            <div>
              <div>Email Status: <span className="text-green-500 pl-2">{currentUser?.isEmailVerified ? "Verified" : <button className="btn btn-outline text-base" onClick={resendVerifyLink}>{isVerifying ? "Verifying..." : "Verify"}</button>} </span></div>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl px-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{currentUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default Profile;