import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function ProtectedRoute(props) {

    const {token, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log(token);
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
            }
        )
        .catch(() => {navigate('/login')});


    },[])


    return (
        props.children
    );
}