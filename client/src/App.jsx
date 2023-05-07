import { useState } from "react";
import "./App.css";
import Chat from "./chat";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [roomid, setRoomid] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && roomid !== "") {
      setShowChat(true);
      socket.emit("join_room", roomid);
    }
  };

  return (
    <div className="App">
    { !showChat ? (
      <div className="joinChatContainer">
        <h3>Join A Chat</h3>
        <input
          type="text"
          placeholder="User name...."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Room ID..."
          onChange={(e) => {
            setRoomid(e.target.value);
          }}
        />
        <button type="submit" placeholder="Join Romm" onClick={joinRoom}>
          Join A Room
        </button>
      </div>
    ) : (
      <Chat socket={socket} username={username} id={roomid} />
    )}
    </div>
  );
}

export default App;
