import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Client from "./Client";

function App() {
  return (
    <>
      <div style={{ display: 'inline-flex' }}>
        <h3>Made using:</h3>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="card">
        <Client />
      </div>
      <p className="box-style">
        Sample Project, Connect: off.rohit123@gmail.com
      </p>
    </>
  );
}

export default App;
