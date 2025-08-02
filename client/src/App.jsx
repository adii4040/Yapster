import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from 'lucide-react';
import Layout from './Components/Layout'
import { Home, Settings, Login, Signup, Profile, ReqForgetPassword, ResetForgetPassword } from './Pages/index'
import { useAuthStore } from './Store/useAuthStore'

function App() {
  const { authUser, getCurrentUser, isFetchingCurrentUser } = useAuthStore()
  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  if (isFetchingCurrentUser && !authUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader size={28} className="animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login'} />} />
          <Route path='/user/profile' element={authUser ? <Profile /> : <Navigate to={'/login'} />} />
          <Route path='/user/settings' element={authUser ? <Settings /> : <Navigate to={'/login'} />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to={'/'} />} />
          <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to={'/'} />} />
          <Route path='/user/request-forgot-password' element={!authUser ? <ReqForgetPassword /> : <Navigate to={'/'} />} />
          <Route path='/user/:resetPasswordToken/reset-forgot-password' element={!authUser ? <ResetForgetPassword /> : <Navigate to={'/'} />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
