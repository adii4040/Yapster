import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Header/Navbar'

function Layout() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout