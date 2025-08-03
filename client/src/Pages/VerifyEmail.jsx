import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'lucide-react';
import { useAuthStore } from '../Store/useAuthStore';

function VerifyEmail() {

    const { userId, emailVerificationToken } = useParams()
    const { verifyEmail, isVerifying, verifyEmailReqStatus: { isSuccess, isError, error, }, verifyEmailResData, getCurrentUser } = useAuthStore();

    useEffect(() => {
        verifyEmail({userId, emailVerificationToken})
    }, [verifyEmail])

    if (isVerifying) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader size={28} className="animate-spin" />
            </div>
        )
    }
    if (isSuccess) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className='text-xl text-green-500'>{verifyEmailResData.message}</p>
            </div>
        )
    }
    if (isError) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className='text-xl text-red-500'>{error?.response?.data?.message}</p>
            </div>
        )
    }
    return (
        <div>VerifyEmail</div>
    )
}

export default VerifyEmail