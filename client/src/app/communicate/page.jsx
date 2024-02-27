// 'use client' indicates that this code will run on the client side
'use client'

// Importing necessary React components and hooks
import React, { Suspense, useContext, useState } from 'react'
import RecentChats from '@/components/CommunicatePageComponents/RecentChats'
import MainChatCard from '@/components/CommunicatePageComponents/MainChatCard'
import HomeContext from '@/context/HomeContext'
import Loader from '@/components/ClipLoader'


// Functional component for the Projects page
export default function Projects() {
  // Destructuring context and state variables from HomeContext
  const { EachUsersMessage, setEachUserMessage, auth, menu } = useContext(HomeContext)

  // Render UI
  return (
    <div className=''>
      <div className='lg:hidden background flex m-5'>
        {/* Suspense is used for lazy-loading components with a loading fallback */}
        {!menu ? (
          <Suspense fallback={<Loader />}>
            {/* RecentChats component is rendered within Suspense for lazy-loading */}
            <RecentChats />
          </Suspense>
        ) : (
          <>
            {/* MainChatCard component is rendered directly */}
            <MainChatCard />
          </>
        )}
      </div>

      <div className='hidden lg:background lg:flex lg:m-5'>
        {/* Suspense is used for lazy-loading components with a loading fallback */}

        <Suspense fallback={<Loader />}>
          {/* RecentChats component is rendered within Suspense for lazy-loading */}
          <RecentChats />
        </Suspense>
        <MainChatCard />

      </div>

    </div>
  )
}