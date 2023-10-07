import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image';
import Link from 'next/Link';
import Style from './NavBar.module.css';
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model, Error } from '../index';
import images from "../../assets";

const Navbar = () => {
  const menuItems = [{
    menu: "all users",
    link: "all user",
  },
  {
    menu: "chat",
    link: "/",
  },
  {
    menu: "Setting",
    link: " /",
  },
  {

    menu: "FAQ",
    link: " /",
  },
  {
    menu: "terms of use",
    link: " /"
  }
  ]

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } = useContext(AppContext);

  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        <div className={Style.Navbar_box}>
          <div className={Style.Navbar_box_left}>
            <image src={images.logo} alt="logo" width={50} height={40}></image>
          </div>
          <div className={Style.Navbar_box_right}>

            {/* for DESKTOP */}

            <div className={Style.Navbar_box_right_menu}>
              {menuItems.map((el, i) => (
                <div onclick={() => setActive(i + 1)} key={1 + 1}
                  className={` ${Style.Navbar_box_right_menu_item} ${active == i + 1 ? Style.active_btn : ""}}`}>
                  <Link className={Style.Navbar_box_right_menu_item_link} href={el.link}> {el.menu}</Link>
                </div>
              ))};
            </div>

            {/* MOBILE */}
            {
              open && <div className={Style.mobile_menu}>
                {menuItems.map((el, i) => (
                  <div onclick={() => setActive(i + 1)} key={i + 1}
                    className={` ${Style.mobile_item} ${active == i + 1 ? Style.active_btn : ""}`}>
                    <Link className={Style.mobile_link} href={el.link}>
                      {el.menu}</Link>
                  </div>
                ))};
                <p className={Style.mobile_menu_btn}>
                  <Image src={images.close}
                    alt="close" width={50} height={50} onClick={() => setOpen(false)} />
                </p>
              </div>
            }

            {/* connectWallet */}

            <div className={Style.Navbar_box_right_connect}>
              {account == "" ? (
                <button onClick={() => connectWallet()}>{""} <span>connect Wallet</span></button>
              ) : (<button onClick={() => setOpenModel(true)}>("")
                <Image src={userName ? images.accountName : images.create2} alt="acc img" width={20} height={20} />
                {""}
                <small> {userName || "create Account"} </small></button>
              )}
            </div>

            <div className={Style.Navbar_box_right_open} onClick={() => setOpen(true)}> '
              <Image src={images.open} alt="open" height={25} width={25} />

            </div>
          </div>
        </div>
      </div>

      {
        openModel && (
          <div className={Style.modelBox}>
            <Model openBox={setOpenModel} title="Welcome to" head="Chat Assistant"
              info="skfnsi kvnoA VKav jakiaf af OKfbir ofjOFJff ofjofb knavoaf zkvnskv kakfq  kgnoqj w iwbirqr qfboi "
              smallInfo="kindly select your name..."
              image={images.hero}
              functionName={createAccount} address={account} />
          </div>
        )}
      {error == "" ? "" : <Error error={error} />}

    </div >


  )

}

export default Navbar;
