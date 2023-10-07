import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router';
import { coverTime } from '../../../Utils/apiFeature';
import { Loader } from '../../index'
import Image from 'next/image';
import Link from 'next/Link';
import Style from './Chat.module.css';
import images from "../../../assets";
import Card from "../Card/Card";


const Chat = () => {
  const Chat = ({
    functionName, readMessage,
    friendMsg, userName, Loading, account,
    currentUserAddress, currentUserName
  })
  const [message, setMessgae] = useState('');
  const [chatData, setChatData] = useState({ name: "", address: "" });
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return
    setChatData(router.query);
  }, [router.isReady]);

  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" height={70} width={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : ("")}
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {
              friendMsg.map((el, i) => (
                <div>
                  {el.sender == chatData.address ? (
                    <div className={Style.Chat_box_left_title}>
                      <Image src={images.accountName} alt="image" height={50} width={50} />
                      <span>{chatData.name} {""}
                        <small>{coverTime(el.timestamp)}</small>
                      </span>
                    </div>
                  ) : (
                    < div className={Style.Chat_box_left_title}>
                      <Image src={images.accountName} alt="image" height={50} width={50} />
                      <span>{userName} {""}
                        <small>Time: {coverTime(el.timestamp)}</small>
                      </span>
                      <p key={i + 1}> {el.msg}
                        {""}
                        {""}</p>
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        </div>
        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt='smile' width={50} height={50} />
              <input type='text' placeholder='type your message' onChange={(e) => (e.target.value)}></input>
              <Image src={images.file} alt='file' width={50} height={50} />
              {
                Loading == true ? (
                  <Loader />
                ) : (<Image src={images.send} alt='send' width={50} height={50}
                  onClick={() => functionName({ msg: message, address: chatData.address })} />)
              }
            </div>
          </div>
        ) : ("")}
      </div>
    </div >
  )
};

export default Chat;
