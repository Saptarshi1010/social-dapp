import React, { useState, useEffect, useContext } from "react";
import { ChatAppContect } from '../Context/ChatAppContext'
import { Filter, Friend } from '../Components/index';

const ChatApp = () => {
  const { } = useContext(ChatAppContect);
  return (
    <>
      <Filter />
      <Friend />
    </>
    // <div>Hey</div>;
  )
};

export default ChatApp;