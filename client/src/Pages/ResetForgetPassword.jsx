import { useEffect, useState } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import AuthImagePattern from "../Components/AuthImagePattern";
import { useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify'
import {resetReqStatus} from '../utils/ResetReqStatus'
const ResetForgetPassword = () => {
    const navigate = useNavigate()
    const { resetPasswordToken } = useParams()
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const { resetForgetPassword, isResettingForgetPassword, resetForgetPasswordReqStatus: { isSuccess, isError, error }, resetForgetPasswordResData } = useAuthStore();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        resetReqStatus("resetForgetPassword")
        resetForgetPassword({formData:form, tokenId: resetPasswordToken});
    };



    useEffect(() => {
        if (isSuccess && resetForgetPasswordResData?.message) {
            toast.success(resetForgetPasswordResData.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {

                navigate('/login');
            }, 1500);
        }

        if (isError && error) {
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
    }, [isSuccess, isError, resetForgetPasswordResData, error])
    return (
        <div className="h-screen grid lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full sm:w-[80%] md:max-w-md mx-auto space-y-5">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                            >
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Reset Your Password</h1>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Confirm Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showconfirmPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                >
                                    {showconfirmPassword ? (
                                        <EyeOff className="h-5 w-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full" disabled={isResettingForgetPassword}>
                            {isResettingForgetPassword ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Resetting...
                                </>
                            ) : (
                                "Reset"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side - Image/Pattern */}
            <AuthImagePattern
                title={"Reset Password!"}
                subtitle={"Reset password to continue with the signin."}
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
    );
};
export default ResetForgetPassword;