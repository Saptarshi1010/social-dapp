
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image';
import Link from 'next/Link';
import Style from './Friend.module.css';
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model, Error } from '../index';
import images from "../../assets";
import Card from "./Card/Card";
import Chat from './Chat/Chat'

const Friend = () => {
  const { readMessage, account, friendLists, sendMessage, userName, Loading, currentUserName, currentUserAddress, readUser } = useContext(ChatAppContect);
  console.log(friendLists);
  return (
    <div className={Style.Friend} >
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendLists.map((el, i) => (
            <Card key={i + 1} el={el} i={i} readMessage={readMessage} readUser={readUser} />
          ))}
        </div>
        <div className={Style.Friend_right}>
          <Chat functionName={sendMessage} readMessage={readMessage}
            friendMsg={friendMsg} userName={userName} Loading={Loading} account={account}
            currentUserAddress={currentUserAddress} currentUserName={currentUserName}
          />
        </div>
      </div>
      Friend</div>);
};

export default Friend;
