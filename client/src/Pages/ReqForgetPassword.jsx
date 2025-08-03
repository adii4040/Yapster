import React, { useEffect, useState } from 'react'
import AuthImagePattern from '../Components/AuthImagePattern'
import { MessageSquare, Mail } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify'
import { useAuthStore } from '../Store/useAuthStore';
import {resetReqStatus} from '../utils/ResetReqStatus'

function ReqForgetPassword() {

    const [email, setEmail] = useState("")
    const { forgetPasswordRequest, isEmailVerifying, forgetPasswordReqStatus: { isSuccess, isError, error }, forgetPasswordReqResData } = useAuthStore()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(forgetPasswordReqResData)
        resetReqStatus("forgetPassword")
        forgetPasswordRequest({email})
    }

    useEffect(() => {
        if (isSuccess && forgetPasswordReqResData?.message) {
            toast.success(forgetPasswordReqResData.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        if (isError) {
            console.log(error)
            toast.error(error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [isSuccess, isError, error, forgetPasswordReqResData])
    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/*--Left side--*/}
            <div className=' flex flex-col justify-center  p-6 sm:p-12 '>
                <div className='w-full sm:w-[80%] md:max-w-md mx-auto space-y-5'>
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                            >
                                <MessageSquare className="w-5 h-5 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Confirm Your Email!</h1>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-8'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-base-content/40" />
                                    </div>
                                    <input
                                        type="email"
                                        className={`input input-bordered w-full pl-10`}
                                        placeholder="you@example.com"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button type="submit" className='btn btn-primary w-full'>
                                {
                                    isEmailVerifying ? "Verying..." : "Verify"
                                }
                            </button>
                        </form>
                    </div>
                </div>

            </div>
            {/*--Right side--*/}
            <AuthImagePattern
                title={"Welcome back!"}
                subtitle={"Just confirm your email to get the reset password link."}
            />


            <ToastContainer
                position="bottom-right"
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
    )
}

export default ReqForgetPassword