import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function GuestRoute(props) {

    let {token,setUser} = useContext(AuthContext);


    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://app.test/api/user', {
            headers:{
                'Authorization':'Bearer ' + token
            }
        })
        .then(
            (response) => {
                setUser(response.data);
                navigate('/');
            }
        )
      
    
    },[token]);

    return props.children
}