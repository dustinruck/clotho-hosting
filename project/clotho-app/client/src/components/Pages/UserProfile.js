import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import UserProfilePublic from './UserProfilePublic';
import UserProfilePrivate from './UserProfilePrivate';


function UserProfile() {
    const { username } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {

        try {

            var response = await axios.get('/users/seller/' + username);
            setUser(response.data.user);
        } catch (err) {
            console.log(err);
        }
    }

    if (!user.username) {
        return( <PageNotFound />)
    }

    if (user.username == sessionStorage.getItem('username')) {
        return (<UserProfilePrivate />)
    }

    return (<UserProfilePublic />)

}
export default UserProfile;
