import React, { useContext, useState } from "react";
import Image from "next/image";
import images from "../../assets";
import Style from './Filter.module.css';
import { ChatAppContect } from '../../Context/ChatAppContext';
import { Model } from '../index';


const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContect);
  const { } = useContext(ChatAppContect);
  const { addFriend, setAddFriend } = useState(false);

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input type="text" placeholder="search.." />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="image" width={20} height={20} /> Clear Chat
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="image" width={20} height={20} /> Add Friend
          </button>
        </div>
      </div>


      {/* MODEL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model openBox={setAddFriend} title="Welcome to" head="Chatgram" info="dcnecijbeixbeo  kdeb dc edc  o4db4 z ob  lorem21
          dkenc lcdmocxl" smallInfo="Kindly select your friend name & address" image={images.hero} functionName={addFriends} />
        </div>
      )}
    </div>
  )
};

export default Filter;
