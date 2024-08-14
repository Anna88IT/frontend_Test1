import React, {useState, useEffect}from "react";
import "../styles/Content.css";

export const Content = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});
    const [userToken, setUserToken] = useState("");
    const [userRefreshToken, setUserRefreshToken] = useState("");

    useEffect(() => {

        fetch('https://dummyjson.com/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: userRefreshToken,
                expiresInMins: 30,
            })
        })
            .then(res => res.json())
            .then(console.log);

        fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': userToken,
            },
        })
            .then(res => res.json())
            .then(console.log);

    },[userData, userRefreshToken, userToken]);

     async function handleLogin(e) {
        e.preventDefault();

         await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: email,
                password: password,
                expiresInMins: 30, //
            })
        })
            .then(res => res.json())
             .then(data =>{
                 setUserData({data: data});
                 setUserToken(data['token']);
                 setUserRefreshToken(data['refreshToken']);
                 localStorage.setItem("refreshToken", userRefreshToken);
             } )
             .catch(error => console.error('Error:', error));

    }
    return(
            <div className="firstSlice">
                <div className="secondSlice"></div>
                <div className="thirdSlice"></div>
                <div className="forthSlice"></div>
                <div className="fifthSlice"></div>
                <form className="form" onSubmit={handleLogin}>
                    <div className="title">
                        <h1>Login</h1>
                    </div>
                    <fieldset>
                        <legend>Email</legend>
                        <input
                            type="text"
                            className="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Password</legend>
                        <input
                            type="password"
                            className="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </fieldset>
                    <div className="buttons">
                        <button type="button" className="cancelBtn">Cancel</button>
                        <button type="submit" className="loginBtn" >Login</button>
                    </div>
                </form>
            </div>
    )
}