import { useEffect, useState } from "react";
import axios from '../../config/Api';
import FriendCard from "./components/FriendCard";
import UserCard from "./components/UserCard";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts"; 

const Social = ({searchTerm, setError }) => {
    const [friends, setFriendsList] = useState([]);
    const [filteredUsersList, setFilteredUsersList ] = useState([]);
    const [searchUsersList, setSearchUsersList ] = useState([]);
    const token = localStorage.getItem('token');
    const [local] = axios;
    const { authenticated, userInfo } = useAuth();

    
    useEffect(() => {
        local.get("/friends", {
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
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }, [token]);

    useEffect(()=> {
        if(searchTerm<=2){
            setSearchUsersList(filteredUsersList)
        }
        else{
            let filter = filteredUsersList.filter((user)=>{
                return user.username.toLowerCase().includes(searchTerm)
            })
            setSearchUsersList(filter)
        }
    },[filteredUsersList, searchTerm])

    useEffect(() => {
        local.get("/user/all", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const allUsers = response.data.users;
            //some is a js boolean function which checks if friend id and user id dont match to return
            const filteredUsers = allUsers.filter(user => !friends.some(friend => friend.friend.id === user.id));
            setFilteredUsersList(filteredUsers);
            console.log(response);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }, [friends, token]);

    const friendList = friends.map((friend, i) => (
        <FriendCard key={friend.id} friend={friend.friend} setError={setError} />
    ));

    const userList = searchUsersList.map((user, i) => (
        <UserCard key={user.id} user={user} setError={setError} />
    ));

    return (
        <div className="pb-36">
            {authenticated && ((userInfo && userInfo.role.includes('admin'))) && (
            <div className="flex mt-4">
              <Link to={`/create/adminUser`} className="btn btn-outline btn-info mr-3">Create Admin</Link>
            </div>
          )}
            <div className="text-3xl font-bold text-start my-4 ml-10 pl-6">Users:</div>
                <hr className="my-4" />
                <div className='grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-1 gap-6 justify-items-center m-5'>
                    {userList}
                </div>
                <div className="my-10"></div>
                <div className="text-3xl font-bold text-start mt-5 ml-10 pl-6">Your Friends:</div>
            <hr className="my-4" />
            <div className='grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-1 gap-6 justify-items-center m-3 mb-5'>
                {friendList}
            </div>
        </div>
    );
};

export default Social;
