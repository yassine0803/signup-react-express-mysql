import {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { getData} from '../../api';
const Profile = () => {
    const { id } = useParams();

    const fetchUser = ()=> {

    }

    return ( <div>Profile</div> );
}
 
export default Profile;