import { useEffect, useState } from "react";
import axios from "axios";
import FriendCard from "./components/FriendCard";

const Social = () => {
    const [friends, setFriendsList] = useState([]);
    const [users, setUsersList] = useState([]);
    
    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("http://localhost/api/friends", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setFriendsList(response.data.data);
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost/api/users", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUsersList(response.data.data);
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    const friendList = friends.map((friend, i) => (
        <FriendCard key={friend.id} friend={friend} />
    ));

    const userList = users.map((user, i) => (
        <FriendCard key={user.id} user={user} />
    ));

    return (
        <>
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {friendList}
            </div>
        </>
    );
};

export default Social;