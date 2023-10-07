import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image';
import Link from 'next/Link';
import Style from './Card.module.css';
import images from "../../../assets";

const Card = ({ readMessage, el, i, readUser }) => {
  return (
    <Link href={{ pathname: '/', query: { name: `${el.name}`, address: `${el.pubkey}` } }}>
      <div className={Style.Card} onClick={() => (readMessage(el.pubkey), readUser(el.pubkey))}>
        <div className={Style.Card_box_left} >
          <Image src={images.accountName} alt="username"
            height={60} width={60} className={Style.Card_box_left_img} />

        </div>
      </div>
      <div className={Style.Card_box_right} >
        <div className={Style.Card_box_right_middle}>
          <h4>{el.name}</h4>
          <small>{el.pubkey.slice(21)}..</small>
        </div>
        <div className={Style.Card_box_right_end}>
          <small> {i + 1}</small>
        </div>

      </div>

    </Link >
  )
};

export default Card;
