import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const authUser = useSelector((store) => store.user.authUser);
  const { selectedUser } = useSelector((store) => store.user);

  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="space-y-2 p-4">
      <div
        role="alert"
        className={`dark:bg-green-900 border-green-500  chat ${
            authUser?._id === message?.senderId
              ? "flex justify-end border-r-4 "
              : "border-l-4"
          }   dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105`}
      >
        <div
          ref={scroll}
          className={`chat ${
            authUser?._id === message?.senderId
              ? "chat-end "
              : "chat-start "
          }  `}
        >
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={
                  message.senderId === authUser?._id
                    ? authUser?.profilephoto
                    : selectedUser.profilephoto
                }
              />
            </div>
          </div>
          <div className="chat-header">
            <time className="text-xs opacity-50">12:45</time>
          </div>

          <div className="chat-bubble text-xs font-semibold">
            {message?.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
