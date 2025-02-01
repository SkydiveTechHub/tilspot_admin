// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context for the socket
const SocketContext = createContext();

// Socket Provider to wrap the app and share the socket instance
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(
      process.env.REACT_APP_SOCKET_URL
      // 'https://tilspot-production.up.railway.app'
      , {
      transports: ["websocket"],
      // reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      withCredentials: true,
    });

    let hasConnected = false;


    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      hasConnected = true
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection failed:", error);
    });

    socketInstance.on("disconnect", () => {
      if (!hasConnected) {
        socket.connect(); // Allow only one attempt
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket in any component
export const useSocket = () => {
  return useContext(SocketContext);
};
