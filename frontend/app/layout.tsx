"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { IUserContext, UserContext } from '../components/UserContext'
import React from "react";
import { User } from "./types";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let [user, setUser] = React.useState<User>({ username: "", token: "", isLoggedIn: false })
    function handleLogout() {
        setUser({username: "", token: "", isLoggedIn: false});
        console.log("logging out")
        document.cookie = "token=;expires=Thu, 01 Jan 1970"
        document.cookie = "username=;expires=Thu, 01 Jan 1970"


    }
    return (
        <html lang="en">

            <body className={inter.className}>

                <UserContext.Provider value={{ user: user, setUser: setUser }}>
                    <div>
                        <Link href="/modules">Modules</Link>
                        <Link href="/plan">Plan</Link>
                        <Link href="/login">Log in</Link>
                        <button onClick={() => handleLogout()}>Log out</button>
                    </div>
                    {children}
                </UserContext.Provider>
            </body>
        </html>
    );
}
