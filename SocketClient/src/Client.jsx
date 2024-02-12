import React, { useState } from "react";
import io from "socket.io-client";

const Client = () => {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const socket = io("http://localhost:5055/", {
    extraHeaders: {
      "Access-Control-Allow-Origin": "http://localhost:5173", // Match your CORS origin
    },
  });
   console.log("socket created", socket)

  const handleConnect = () => {
    
    socket.on("connect_error", (error) => {
      console.error("Error connecting to server:", error.message);
    });

    socket.emit(
      "requestForConnection",
      "Requesting to send message from Clent"
    );

    // Handle connection
    socket.on("requestForConnection", (msg) => {
      setConnected(true);
      setMessage("Connected to Server");
      console.log("received msg", msg);
    });
  };

  return (
    <div className="card">
      <h2>WebSocket Connection</h2>
      <p>{connected ? "Connected to Server" : "Not Connected"}</p>

      <h2>Server Message</h2>
      <p>{message}</p>

      <button onClick={handleConnect}>Connect</button>
    </div>
  );
};

export default Client;
