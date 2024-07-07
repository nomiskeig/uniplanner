"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { IUserContext, UserContext } from '../components/UserContext'
import React from "react";
import { User } from "./types";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

import "../i18n"
import TopBar from "@/components/TopBar";
import { useRouter } from "next/navigation";

export default function RootLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    let [user, setUser] = React.useState<User>({ username: "", token: "", isLoggedIn: false })
    function handleLogout() {
        setUser({ username: "", token: "", isLoggedIn: false });
        document.cookie = "token=;expires=Thu, 01 Jan 1970"
        document.cookie = "username=;expires=Thu, 01 Jan 1970"
        router.push("/modules")
        


    }
    return (
        <html lang="en">
            <body className={inter.className}>
                <UserContext.Provider value={{ user: user, setUser: setUser }}>
                    <TopBar user={user} handleLogout={handleLogout}></TopBar>
                    {children}
                </UserContext.Provider>
            </body>
        </html>
    );
}
