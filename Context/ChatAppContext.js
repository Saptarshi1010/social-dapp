//Here we are communicating with the smartcontract

import { React, useState } from "react";
import useRouter from "next/router";
import { CheckifWalletConnected, connectWallet, connectingwithContract } from '../Utils/apiFeature';
import { useEffect } from "react";

export const ChatAppContect = React.createContect();

export const ChatAppProvider = ({ children }) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [userList, setUserList] = useState([]);
    const [friendList, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    const fetchData = async () => {
        try {
            const contract = await connectingwithContract();
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            // const userName = await contract.getUsername(connectAccount);
            // setUserName(userName);
            const friendList = await contract.getmyfriendslist();
            setFriendLists(friendList);
            const userList = await contract.fetchalluser();
            setUserList(userList);
        } catch (error) {
            // setError("Please install and connect your wallet");
            console.log("error")
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectingwithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        }
        catch (error) {
            setError("You have no messages");
        }
    }
    const createAccount = async ({ name, accountAddress }) => {
        try {
            // if (name || accountAddress)
            //     return setError("name & address not found");
            const contract = await connectingwithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);

        } catch (error) {
            setError("Error occured while creating the account");
        }
    }
    const addFriends = async ({ name, accountAddress }) => {
        try {
            // if (name || accountAddress)
            //     return setError("Please provide contract details");
            const contract = await connectingwithContract();
            const addAFriend = await contract.addFriend(accountAddress, name);
            setLoading(true)
            await addAFriend.wait()
            setLoading(false)
            router.push("/")
            window.location.reload();
        } catch (error) {
            setError("Something went wrong while adding ")
        }
    }
    const sendMessage = async (msg, address) => {
        try {
            // if (msg || address)
            //     return setError("Plz type your msg");
            const contract = await connectingwithContract();
            const addMsg = await contract.sendmessage(msg, address);
            setLoading(true)
            await addMsg.wait()
            setLoading(false)
            window.location.reload();

        } catch (error) {
            setError("plz reload and try again")
        }
    }
    const readUser = async (useraddress) => {

        const contract = await connectingwithContract();
        const username = await contract.getusername(useraddress);
        setCurrentUserName(username);
        setCurrentUserAddress(useraddress);

    }
    return (
        <ChatAppContect.Provider value={{
            userName, createAccount, addFriends,
            readUser, sendMessage, readMessage, account, friendList, friendMsg,
            userList, loading, error, currentUserName, currentUserAddress,
            CheckifWalletConnected
        }}>{children}</ChatAppContect.Provider>
    )
}


