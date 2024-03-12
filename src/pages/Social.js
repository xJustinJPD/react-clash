import { useEffect, useState } from "react";
import axios from '../config/Api';
import FriendCard from "./components/FriendCard";
import UserCard from "./components/UserCard";

const Social = (props) => {
    const [friends, setFriendsList] = useState([]);
    const [users, setUsersList] = useState([]);
    const [filteredUsersList, setFilteredUsersList ] = useState([])
    
    let token = localStorage.getItem('token');

    useEffect(()=> {
        if(props.searchTerm<=2){
            setFilteredUsersList(users)
        }
        else{
            let filter = users.filter((user)=>{
                return user.username.toLowerCase().includes(props.searchTerm)
            })
            setFilteredUsersList(filter)
        }
    },[users, props.searchTerm])

    useEffect(() => {
        axios.get("/user/all", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUsersList(response.data.users);
            setFilteredUsersList(response.data.users)
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    // const friendList = friends.map((friend, i) => (
    //     <FriendCard key={friend.id} friend={friend} />
    // ));

    const userList = filteredUsersList.map((user, i) => (
        <UserCard key={user.id} user={user} />
    ));

    return (
        <>
            <div>Friends</div>
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {/* {friendList} */}
            </div>
            <div>Users</div>
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {userList}
            </div>
        </>
    );
};

export default Social;