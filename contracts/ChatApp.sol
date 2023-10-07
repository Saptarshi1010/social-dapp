// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ChatApp {
    struct Friend {
        address pubkey;
        string name;
    }
    struct User {
        string name;
        Friend[] friendsList;
    }
    struct Message {
        address sender;
        uint time;
    }
    struct Alluserstruct {
        string name;
        address accountaddress;
    }
    Alluserstruct[] public getallusers;
    mapping(address => User) public userlist; //where each users are listed
    mapping(bytes32 => Message[]) public allmessages; //contains the messages between 2 users

    function checkuservalidity(address pubkey) public view returns (bool) {
        return bytes(userlist[pubkey].name).length > 0;
    }

    function createaccount(string memory _name) public {
        require(checkuservalidity(msg.sender) == false, "user already exists");
        require(bytes(_name).length > 0, "username cannot be empty");
        userlist[msg.sender].name = _name;
        getallusers.push(Alluserstruct(_name, msg.sender));
    }

    function getUsername(address pubkey) external view returns (string memory) {
        require(checkuservalidity(pubkey), " not a valid user");
        return userlist[pubkey].name;
    }

    function addfriend(string memory _name, address _friend) external {
        require(checkuservalidity(msg.sender), "create an account first");
        require(checkuservalidity(_friend), "user is not registered");
        require(
            msg.sender != _friend,
            "user cannot add themselves as a friend"
        );
        require(
            checkalreadyfriend(msg.sender, _friend) == false,
            "these users are already friends"
        );

        //we are updating the function for the both the user
        _addfriend(msg.sender, _friend, _name); //here i am sending friend req
        _addfriend(_friend, msg.sender, userlist[msg.sender].name); // here it is gettimg updated from the other person
    }

    function checkalreadyfriend(
        address _pubkey1,
        address _pubkey2
    ) internal view returns (bool) {
        //meaning ??
        if (
            userlist[_pubkey1].friendsList.length ==
            userlist[_pubkey2].friendsList.length
        ) {
            address tmp = _pubkey1; // here we are updating with one another and making connection between them
            _pubkey1 = _pubkey2;
            _pubkey2 = tmp;
        } else {
            _pubkey1 = _pubkey2;
            address tmp = _pubkey1; // here we are updating with one another and making connection between them
            _pubkey2 = tmp;
        }
        for (uint i = 0; i < userlist[_pubkey1].friendsList.length; i++) {
            if (userlist[_pubkey1].friendsList[i].pubkey == _pubkey2)
                return true; //here we are seeing if friend1 is friends with friend2
        }
        return false;
    }

    function _addfriend(
        address _me,
        address _friend,
        string memory _name
    ) internal {
        Friend memory newfriend = Friend(_friend, _name);
        userlist[_me].friendsList.push(newfriend);
    }

    function getmyfriendslist() external view returns (Friend[] memory) {
        return userlist[msg.sender].friendsList;
    }

    function _getchatcode(
        address _pubkey1,
        address _pubkey2
    ) internal pure returns (bytes32) {
        if (_pubkey1 < _pubkey2) {
            return keccak256(abi.encodePacked(_pubkey1, _pubkey2));
        } else {
            return keccak256(abi.encodePacked(_pubkey2, _pubkey1));
        }
    }

    function sendmessage(address _friend) external {
        require(
            checkuservalidity(msg.sender),
            "only people with account can send a message"
        );
        require(checkuservalidity(_friend), "user is not valid"); // the person who is making this call exists or not
        require(
            checkalreadyfriend(msg.sender, _friend),
            "you are not friends with the user"
        );
        bytes32 chatCode = _getchatcode(msg.sender, _friend);
        Message memory newmessage = Message(msg.sender, block.timestamp);
        allmessages[chatCode].push(newmessage);
    }

    function readmessage(
        address _friend
    ) external view returns (Message[] memory) {
        bytes32 chatCode = _getchatcode(msg.sender, _friend);
        return allmessages[chatCode];
    }

    function fetchallusers() public view returns (Alluserstruct[] memory) {
        return getallusers;
    }
}
