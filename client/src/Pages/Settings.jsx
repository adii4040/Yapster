import React from 'react'
import { THEMES } from '../lib/constant'
import { useThemeStore } from '../Store/useThemeStore'


function Settings() {
  const { theme, setTheme } = useThemeStore()
  return (
    <div className='w-full min-h-screen mt-16'>
      <div className='w-[70%] h-full mx-auto p-5'>
        <div>
          <h1 className='font-bold text-2xl'>Theme</h1>
          <p className='font-medium text-base-content/80'>Choose a theme for your chat interface</p>
        </div>

        <div className='w-full h-[80%] mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-5 '>
          {
            THEMES.map((t) => (
              <button key={t} className={`h-16 rounded-md group flex flex-col items-center ${t === theme ? "bg-black" : "hover:bg-base-200/50"}`} data-theme={t} onClick={() => setTheme(t)}>
                <div className='relative h-10 w-full rounded-md ' >
                  <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
                    <div className='rounded bg-neutral'></div>
                    <div className='rounded bg-primary'></div>
                    <div className='rounded bg-secondary'></div>
                    <div className='rounded bg-accent'></div>
                  </div>
                </div>
                <span className='text-sm font-medium truncate w-full text-center text-primary'>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))
          }
        </div>
      </div>
    </div >
  )
}

export default Settings