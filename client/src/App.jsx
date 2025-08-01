import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from 'lucide-react';

import Layout from './Components/Layout'
import { Home, Settings, Login, Signup, Profile } from './Pages/index'
import { useAuthStore } from './Store/useAuthStore'



function App() {
  const { authUserData, getCurrentUser, isFetchingCurrentUser } = useAuthStore()
  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  if (isFetchingCurrentUser && !authUserData) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loader size={52} className='animate-spin' />
        
      </div>
    )
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={authUserData ? <Home /> : <Navigate to={'/login'} />} />
          <Route path='/user/profile' element={authUserData ? <Profile /> : <Navigate to={'/login'} />} />
          <Route path='/user/settings' element={authUserData ? <Settings /> : <Navigate to={'/login'} />} />
          <Route path='/login' element={!authUserData ? <Login /> : <Navigate to={'/'} />} />
          <Route path='/signup' element={!authUserData ? <Signup /> : <Navigate to={'/'} />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
