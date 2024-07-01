"use client"

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { UserContext } from "@/components/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

function writeToCookie(token: string, username: string) {
    document.cookie = "token="+token
    document.cookie = "username="+username
}

export default function Page() {
    const [usernameInput, setUsernameInput] = React.useState<string>("");
    const [passwordInput, setPasswordInput] = React.useState<string>("");
    const userContext = useContext(UserContext)
    const router = useRouter();
    useEffect(() => {
        console.log(document.cookie)
        if (document.cookie.includes("token")) {
            let token = document.cookie.match(/token=(.*);/)![1]
            let username = document.cookie.match(/username=(.*)/)![1]
            
            userContext.setUser({username: username, token: token, isLoggedIn: true})
            router.push("/plan")
        }

    },[])
    function handleLogin() {
        fetch("http://localhost:8080/api/v1/users/login", {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'POST', body: JSON.stringify(
                {
                    "password": passwordInput,
                    "username": usernameInput
                }
            )
        })
            .then(res => {
                if (!res.ok) {
                    alert("Error when logging in: " +  res.status)

                }

                return res.json()
            })
            .then(data => { writeToCookie(data.token, usernameInput), userContext.setUser({ token: data.token, username: usernameInput, isLoggedIn: true }); console.log("logged in "); console.log(data)})
            .catch(err => console.log(err.message))


    }

    return <div>
        <div>
            <Link href="/plan">Go to plan</Link>
            <button onClick={() => {console.log(userContext.user)}}>print</button>
            Login
            <Input title={"Username"} type={"text"} value={usernameInput} onChange={(newValue: string) => setUsernameInput(newValue)}></Input>
            <Input title={"Password"} type={"password"} value={passwordInput} onChange={(newValue: string) => setPasswordInput(newValue)}></Input>
            <Button onClick={handleLogin} text={"Log in"}></Button>
        </div>

    </div>
}

