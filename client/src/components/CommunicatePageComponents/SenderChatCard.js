// Setting the environment to use client-side rendering
"use client";

// Importing React and useState from React
import React from 'react'
import { useState } from 'react';

// Functional component for rendering a chat card for the sender
export default function SenderChatCard({ ele }) {
  // JSX structure for rendering the sender's chat card
  return (
    <div className='flex items-center p-5 w-full justify-end'>
      {/* Displaying the sender's message with styling */}
      <div className="card bodyCard mx-5"><div className='font-bold'>{ele.sender}</div>{ele.message}</div>
      {/* Displaying the sender's profile image */}
      <img src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="" className="w-16 h-16 rounded-full" />
    </div>
  )
}
