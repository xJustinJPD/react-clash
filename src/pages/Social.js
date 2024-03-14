import { useEffect, useState } from "react";
import axios from '../config/Api';
import FriendCard from "./components/FriendCard";
import UserCard from "./components/UserCard";

const Social = (props) => {
    const [friends, setFriendsList] = useState([]);
    const [filteredUsersList, setFilteredUsersList ] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("/friends", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setFriendsList(response.data.friends);
            console.log("friends", response.data.friends);
        })
        .catch(err => {
            console.error(err);
        });
    }, [token]);

    useEffect(() => {
        axios.get("/user/all", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const allUsers = response.data.users;
            const filteredUsers = allUsers.filter(user => !friends.some(friend => friend.friend.id === user.id));
            setFilteredUsersList(filteredUsers);
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    }, [friends, token]);

    const friendList = friends.map((friend, i) => (
        <FriendCard key={friend.id} friend={friend.friend} />
    ));

    const userList = filteredUsersList.map((user, i) => (
        <UserCard key={user.id} user={user} />
    ));

    return (
        <div>
            <div className="text-3xl font-bold text-center my-4">Friends</div>
            <hr className="my-4" />
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {friendList}
            </div>
            <div className="text-3xl font-bold text-center my-4">Users</div>
            <hr className="my-4" />
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {userList}
            </div>
        </div>
    );
};

export default Social;
