import {createContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );

    const login = async (inputs) => {
        const res = await axios.post('http://localhost:8800/api/auth/login', inputs, {
            // need to work with cookies
            withCredentials: true
        })

        setCurrentUser(res.data)
    };

    useEffect(() => {

        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);


    return (

        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthContextProvider};
