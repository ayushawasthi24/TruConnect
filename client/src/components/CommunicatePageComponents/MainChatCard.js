// Setting the environment to use client-side rendering
"use client";
// Importing React, useContext, useRef, useEffect, useState, and chat card components
import React, { useContext, useRef, useEffect } from 'react'
import { useState } from 'react';
import SenderChatCard from './SenderChatCard';
import { IoSend } from "react-icons/io5";
import RecieverChatCard from './RecieverChatCard';
import HomeContext from '@/context/HomeContext';
import { GoCopilot } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
// Functional component for rendering the main chat card
export default function MainChatCard({ id }) {
  // Destructuring values from the HomeContext
  const { auth, EachUsersMessages, setEachUsersMessages, SelectedName, setSelectedName, Receiver, Group, AI, setAI, menu, setMenu ,setReceiver} = useContext(HomeContext)
  useEffect(() => {
    if(Receiver){
      //scroll the chat area to the bottom
    const msgBody = document.getElementById("msg-body");
    msgBody.scrollTop = msgBody.scrollHeight;
    }
  }, [EachUsersMessages]);
  // Initializing WebSocket using useRef hook
  let socket = useRef(null);

  // State for storing the current message
  const [message, setmessage] = useState(null)

  // useEffect for handling WebSocket connection
  useEffect(() => {
    // Creating a new WebSocket connection when the component mounts
    socket.current = new WebSocket(
      `ws://103.159.214.229/ws/chat/${auth?.user?.id}`
    );

    // WebSocket event handler for the "open" event
    socket.current.onopen = () => {
    };

    // WebSocket event handler for the "message" event
    socket.current.onmessage = (e) => {
      const data = JSON.parse(e.data);


      // Handling different types of messages received
      if (data["type"] === "sent_message") {
        const new_data = {
          sender: data["sender"],
          message: data["message"],
          receiver: data["receiver"],
          id: data["id"],
          created_at_date: data["created_at_date"],
          created_at_time: data["created_at_time"],
        };
        setEachUsersMessages((prev) => {
          return [...prev, new_data];
        });
      } else if (data["type"] === "receive_message") {
        const new_data = {
          sender: data["sender"],
          message: data["message"],
          receiver: data["receiver"],
          id: data["id"],
          created_at_date: data["created_at_date"],
          created_at_time: data["created_at_time"],
          group: data["group"],
          ai: data["ai"]
        };
        setEachUsersMessages((prev) => {
          return [...prev, new_data];
        });
      }
    };

    // WebSocket event handler for the "close" event
    socket.current.onclose = () => {
    };

    // WebSocket event handler for the "error" event
    socket.current.onerror = (e) => {
    };
    
  }, [socket.current, auth]);

  const toggleMenu = () => {
    setMenu(!menu);
  };
  
  // JSX structure for rendering the main chat card
  return (
    <div  className={`border border-gray-200 bg-white w-full md:w-3/4 h-screen relative md:block ${menu ? "block" : "hidden"}`}>
      {Receiver != null ? (
        <>
          <div className="w-full flex items-start justify-start p-2 border border-gray-200 absolute top-0 bg-white z-1">
            <img src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="" className="w-16 h-16 rounded-full" />
            <div className="flex flex-col px-4 justify-center items-start text-gray-600 !w-full min-w-[65%]">
              <h2 className="text-xl font-semibold">{SelectedName}</h2>
              <h3 className="text-base font-light">Last active at: 3rd Nov 2023, 7:08PM</h3>
            </div>
            <div onClick={toggleMenu} className="flex md:hidden w-full justify-end items-center my-auto">
              {menu ? (
                <IoIosClose className='w-10 h-10 cursor-pointer' />
              ) : (
                <IoIosClose className='w-10 h-10 cursor-pointer' />
              )}
            </div>
          </div>
          <div id="msg-body" className="h-screen overflow-scroll py-[100px]">
            {EachUsersMessages?.map((ele) => {
              return (
                <div>
                  {ele.sender == auth.user.username ? (
                    <SenderChatCard ele={ele} />
                  ) : (
                    <RecieverChatCard ele={ele} />
                  )}
                </div>
              )
            })}
          </div>
          <div className="flex justify-center items-center border border-gray-200 p-3 absolute bottom-0 bg-white w-full">
            <input onChange={(e) => {
              setmessage(e.target.value)
            }} placeholder="Enter Your Message" className="mx-4 border border-gray-200 h-10 w-full rounded-lg px-2 text-black" />
            <button className='text-black flex' onClick={() => {
              // Sending a message to the user through WebSocket
              socket.current.send(JSON.stringify({
                "type": "send_message_to_user",
                "data": {
                  "sender": auth.user.id,
                  "receiver": Receiver,
                  "group": Group,
                  "ai": AI,
                  "message": message
                }
              }))
            }}><IoSend className='text-black mx-4 w-8 h-8' /> </button>
            {Group && <button id="ai-grp-btn" className='text-black' onClick={(e) => {
              // Toggling the AI button's color and setting the AI state
              if (document.getElementById('ai-grp-btn').classList.contains('text-blue-600')) {
                setAI(false)
                document.getElementById('ai-grp-btn').className = "text-black"
              }
              else {
                setAI(true)
                document.getElementById('ai-grp-btn').className = "text-blue-600"
              }

            }}><GoCopilot className=' transition-all fade-in-out mx-4 w-8 h-8' /></button>}


          </div>
        </>
      ) : (
        <div className='flex flex-col'>
          <div className="w-full flex items-center justify-start p-2 border border-gray-200 absolute top-0 bg-white z-1 h-20">
            <div className="flex flex-col px-4 justify-center items-start text-gray-600 !w-full min-w-[75%]">
              <h2 className="text-xl font-semibold">You Havent Selected Any One</h2>
            </div>
            <div onClick={toggleMenu} className="flex md:hidden w-full justify-end items-center my-auto">
              {menu ? (
                <svg className="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <line x1="0" y1="0" x2="50" y2="50" stroke-width="5" stroke="black" />
                  <line x1="0" y1="50" x2="50" y2="0" stroke-width="5" stroke="black" />
                </svg>
              ) : (
                <svg className="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <rect x="0" y="7.5" width="50" height="5" />
                  <rect x="0" y="22.5" width="50" height="5" />
                  <rect x="0" y="37.5" width="50" height="5" />
                </svg>
              )}
            </div>
          </div>
          <div className="w-full text-center items-center flex justify-center">
          </div>
        </div>
      )}


    </div>
  )
}

// Function to fetch personal chats data from the server
const fetchPersonalChats = async (data) => {
  return axios
    .post(
      `http://103.159.214.229/api/v1/__get__personal__chat__/${data.receiver_id}`,
      { id: data.sender_id },
      {
        headers: {
          Authorization: `Bearer ${data.access}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return [];
    });
};

// Custom hook for getting personal chats data
const useGetPersonalChats = () => {
  const queryClient = useQueryClient();
  const { EachUsersMessages, setEachUsersMessages } = useContext(HomeContext);
  return useMutation({
    mutationFn: fetchPersonalChats,
    onSuccess: (data) => {
      setEachUsersMessages(data);
      queryClient.invalidateQueries(["UsersMessages"]);
    },
    onError: (context) => {
      queryClient.setQueryData(["UsersMessages"], context.previousData);
    },
  });
};