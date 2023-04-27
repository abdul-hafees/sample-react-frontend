import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function GuestRoute(props) {

    let {token,setUser} = useContext(AuthContext);
    let accessToken = localStorage.getItem('token');


    const navigate = useNavigate();

    useEffect(() => {
        if (!accessToken) {
            // navigate('/login');
            return;
        }

        axios.get('http://app.test/api/user', {
            headers:{
                'Authorization':'Bearer ' + accessToken
            }
        })
        .then(
            (response) => {
                setUser(response.data);
                navigate('/');
            }
        )
      
    
    },[]);

    return props.children
}