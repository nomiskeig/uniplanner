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
import { NotificationType, Notification, NotificationContext } from "@/components/NotificationContext";
import { NotificationDisplay } from "@/components/NotificationDisplay";

export default function RootLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    let [user, setUser] = React.useState<User>({ username: "", token: "", isLoggedIn: false })
    let [notifications, setNotifications] = React.useState<Notification[]>([])
    let [notificationCounter, setNotificationCounter] = React.useState<number>(0);
    function handleLogout() {
        setUser({ username: "", token: "", isLoggedIn: false });
        document.cookie = "token=;expires=Thu, 01 Jan 1970"
        document.cookie = "username=;expires=Thu, 01 Jan 1970"
        router.push("/modules")



    }

    function addNotification(text: string, type: NotificationType) {
        setNotifications([...notifications, { text: text, type: type, id: notificationCounter }])
        setNotificationCounter(notificationCounter + 1);
        console.log("added notificiatoin")

    }
    function removeNotification(notification: Notification) {
        setNotifications(notifications.filter(n => n.id !== notification.id))
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <UserContext.Provider value={{ user: user, setUser: setUser }}>
                    <NotificationContext.Provider value={{ notifications: notifications, addNotification: addNotification, deleteNotification: removeNotification }}>
                        <TopBar user={user} handleLogout={handleLogout}></TopBar>
                        <NotificationDisplay>
                        </NotificationDisplay>
                        {children}
                    </NotificationContext.Provider>
                </UserContext.Provider>
            </body>
        </html>
    );
}
