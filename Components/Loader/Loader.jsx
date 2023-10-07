import React, { useState, useContext } from "react";
import Image from 'next/image';
import images from "../../assets";
import Style from './Loader.module.css';
import { ChatAppContect } from '../../Context/ChatAppContext';


const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <Image src={images.loader} alt="Loader" width={100} height={100} />
      </div>
    </div>
  )
}

export default Loader

