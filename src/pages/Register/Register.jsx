import React, { useState } from "react";
import "./Register.css";
import { useUser } from "../../Data/Users/Users";

function Register() {
    const { registerUser, error} = useUser();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [login, setLogin] = useState("");

    function handleLogin(event) {
        let { value } = event.target;
        setLogin(value);
    }

    function handleEmail(event) {
        let { value } = event.target;
        setEmail(value);
    }

    function handlePassword(event) {
        let { value } = event.target;
        setPassword(value);
    }

    function handleConfirmedPassword(event) {
        let { value } = event.target;
        setConfirmedPassword(value);
    }

    async function registerSubmit(event) {
        event.preventDefault()
        if (password == confirmedPassword && password !== "" && confirmedPassword !== "") {
            await registerUser(email, password, login);
        } else {
            console.log(error);
        }
    }

    return (
        <section id="login">
            <div id="login-wrapper">
                <form id="form" onSubmit={registerSubmit}>
                    <input
                        type="text"
                        placeholder="login"
                        onChange={handleLogin}
                        value={login}
                    />
                    <input
                        type="text"
                        placeholder="mail"
                        onChange={handleEmail}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        onChange={handlePassword}
                        value={password}
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        onChange={handleConfirmedPassword}
                        value={confirmedPassword}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </section>
        
    );
}

export default Register;