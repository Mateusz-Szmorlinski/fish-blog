import React, { useState } from "react";
import "./Login.css";
import { useUser } from "../../Data/Users/Users";

function Login() {
    const { loginUser } = useUser();
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");

    function handleLogin(event) {
        let { value } = event.target;
        setLogin(value);
    }

    function handlePassword(event) {
        let { value } = event.target;
        setPassword(value);
    }

    function loginSubmit(event) {
        event.preventDefault();
        loginUser(login, password);
    }

    return (
        <section id="login">
            <div id="login-wrapper">
                <form id="form" onSubmit={loginSubmit}>
                    <input
                        type="text"
                        placeholder="login"
                        onChange={handleLogin}
                        value={login}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={handlePassword}
                        value={password}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </section>
        
    );
}

export default Login;