import React, { useState, useEffect, useContext } from 'react'
import UserCard from '../Components/index';
import Style from '../styles/alluser.module.css';
import { ChatAppContect } from "../Context/ChatAppContext";

const alluser = () => {
  const { userList, addFriends } = useContext(ChatAppContect)
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Find your friends</h1>
      </div>;
      <div className={Style.alluser}>{userList.map((el, i) => (<UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />))}
        <h1>Find your friends</h1>
      </div>;

    </div>
  )
};

export default alluser;