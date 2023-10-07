import React, { useState, useContext } from "react";
import Image from 'next/image';
import images from "../../assets";
import Style from './Model.module.css';
import { ChatAppContect } from '../../Context/ChatAppContext';
import { Loader } from '../../Components/index'

const Model = ({ openBox, title, head, info, smallInfo, image, functionName }) => {
  const [name, setName] = useState('');
  const [accountAddress, setAccountAddress] = useState('');
  const { loading } = useContext('SocialAppContext');

  return (
    <div className={Style.model}>
      <div className={Style.model_box}>
        <div className={Style.model_box_left}>
          <Image src={image} alt="buddy" width={600} height={600} />
        </div>
        <div className={Style.model_box_right}>
          <h1>{title} <span>{head}</span></h1>
          <p>{info}</p>
          <small>{smallInfo}</small>
          {loading == true ? (<Loader />) : (<div className={Style.model_box_right_name}>
            <div className={Style.model_box_right_name_info}>
              <Image src={images.username} alt="user" width={30} height={30}></Image>
              <input type='text' placeholder='your name' onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className={Style.model_box_right_name_info}>
              <Image src={images.account} alt="user" width={30} height={30}></Image>
              <input type='text' placeholder={address || "Enter address.."}
                onChange={(e) => setAccountAddress(e.target.value)}></input>
            </div>
            <div className={Style.model_box_right_name_btn}>
              <Image src={images.account} alt="user" width={30} height={30}></Image>
              <button onClick={() => functionName({ name, accountAddress })}>
                {""} <Image src={images.send} alt="send" width={30} height={30} /> Submit
              </button>
              <button onClick={() => openBox(false)}>
                {""} <Image src={images.close} alt="send" width={30} height={30} /> Cancel
              </button>
            </div>
          </div>
          )}
        </div>
      </div >
    </div >
  )
}

export default Model;
