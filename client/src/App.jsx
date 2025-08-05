import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from 'lucide-react';
import Layout from './Components/Layout'
import { Home, Settings, Login, Signup, Profile, ReqForgetPassword, ResetForgetPassword, Update, VerifyEmail } from './Pages/index'
import { useAuthStore } from './Store/useAuthStore'
import { useThemeStore } from './Store/useThemeStore'

function App() {
  const { authUser, getCurrentUser, isFetchingCurrentUser } = useAuthStore()
  const {theme} = useThemeStore()
  //console.log(authUser?.data?.user)
  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  if (isFetchingCurrentUser && !authUser) {
    return (
      <div className="h-screen flex items-center justify-center" data-theme={theme}>
        <Loader size={28} className="animate-spin" />
      </div>
    )
  }

  return (
    <>
      <div data-theme={theme}>
        <Routes>
          <Route path='/' element={<Layout />}>

            {/*----Secured Routes----*/}
            <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
            <Route path='/user/:userId/profile' element={authUser ? <Profile /> : <Navigate to={'/login'} />} />
            <Route path='/user/settings' element={<Settings />} />
            <Route path='/user/:userId/update' element={authUser ? <Update /> : <Navigate to={'/login'} />} />

            <Route path='/user/:userId/verify-email/:emailVerificationToken' element={<VerifyEmail />} />

            <Route path='/login' element={!authUser ? <Login /> : <Navigate to={'/'} />} />
            <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
            <Route path='/user/request-forgot-password' element={!authUser ? <ReqForgetPassword /> : <Navigate to={'/'} />} />
            <Route path='/user/:resetPasswordToken/reset-forgot-password' element={!authUser ? <ResetForgetPassword /> : <Navigate to={'/'} />} />

          </Route>
        </Routes>
      </div>

    </>
  )
}

export default App
