import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import User from "./User";
import MessagePanel from "./MessagePanel";

// Initialize socket
const socket = io("http://your-socket-server-url");

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Initialize user properties
  const initReactiveProperties = (user) => {
    user.connected = true;
    user.messages = [];
    user.hasNewMessages = false;
    return user;
  };

  // Handle incoming messages
  const handleMessage = useCallback(
    (content) => {
      if (selectedUser) {
        socket.emit("private message", {
          content,
          to: selectedUser.userID,
        });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userID === selectedUser.userID
              ? {
                  ...user,
                  messages: [...user.messages, { content, fromSelf: true }],
                }
              : user
          )
        );
      }
    },
    [selectedUser]
  );

  // Handle user selection
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.userID === user.userID ? { ...u, hasNewMessages: false } : u
      )
    );
  };

  useEffect(() => {
    const handleConnect = () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.self ? { ...user, connected: true } : user
        )
      );
    };

    const handleDisconnect = () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.self ? { ...user, connected: false } : user
        )
      );
    };

    const handleUsers = (users) => {
      const updatedUsers = users.map((user) => {
        user.self = user.userID === socket.id;
        return initReactiveProperties(user);
      });
      setUsers(
        updatedUsers.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          return a.username.localeCompare(b.username);
        })
      );
    };

    const handleUserConnected = (user) => {
      setUsers((prevUsers) => [...prevUsers, initReactiveProperties(user)]);
    };

    const handleUserDisconnected = (id) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userID === id ? { ...user, connected: false } : user
        )
      );
    };

    const handlePrivateMessage = ({ content, from }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userID === from
            ? {
                ...user,
                messages: [...user.messages, { content, fromSelf: false }],
                hasNewMessages: user !== selectedUser,
              }
            : user
        )
      );
    };

    // Set up socket listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("users", handleUsers);
    socket.on("user connected", handleUserConnected);
    socket.on("user disconnected", handleUserDisconnected);
    socket.on("private message", handlePrivateMessage);

    // Clean up socket listeners on component unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("users", handleUsers);
      socket.off("user connected", handleUserConnected);
      socket.off("user disconnected", handleUserDisconnected);
      socket.off("private message", handlePrivateMessage);
    };
  }, [selectedUser]);

  return (
    <div>
      <div className="left-panel">
        {users.map((user) => (
          <User
            key={user.userID}
            user={user}
            selected={selectedUser === user}
            onSelect={() => handleSelectUser(user)}
          />
        ))}
      </div>
      {selectedUser && (
        <MessagePanel
          user={selectedUser}
          onInput={handleMessage}
          className="right-panel"
        />
      )}
    </div>
  );
};

export default Chat;
