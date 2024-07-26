"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { IUserContext, UserContext } from '../components/UserContext'
import React, { useEffect } from "react";
import { Semester, User } from "./types";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

import "../i18n"
import TopBar from "@/components/TopBar";
import { useRouter } from "next/navigation";
import { NotificationType, Notification, NotificationContext } from "@/components/NotificationContext";
import { NotificationDisplay } from "@/components/NotificationDisplay";
import { SemesterContext } from "@/components/SemesterContext";

export default function RootLayout({

    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    let [user, setUser] = React.useState<User>({
        username: "", token: "", isLoggedIn: false,
    })
    let [notifications, setNotifications] = React.useState<Notification[]>([])
    let [notificationCounter, setNotificationCounter] = React.useState<number>(0);
    let [semester, setSemester] = React.useState<Semester | null>(null)
    let [possibleSemesters, setPossibleSemesters] = React.useState<Semester[]>([]);


    function getSemesterFromID(id: string): Semester {
        const name = id.at(0) == "W" ? "Winter " + id.substring(1) : "Summer " + id.substring(1);
        return {
            name: name,
            id: id
        }

    }
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/data/semesters', {
            method: 'GET'
        }).then(res => res.json()).then(data => {console.log(data.data);setPossibleSemesters(data.data)});
        if (!user.isLoggedIn) {
            return;
        }
        fetch('http://localhost:8080/api/v1/plan/startingSemester', {
            method: 'GET', headers: {
                'Authorization': "Bearer " + user.token
            }
        }).then(res => res.json()).then(data => { console.log(data); setSemester(data.message) }
        )

    }, [user])
    function handleLogout() {
        setUser({ username: "", token: "", isLoggedIn: false });
        document.cookie = "token=;expires=Thu, 01 Jan 1970"
        document.cookie = "username=;expires=Thu, 01 Jan 1970"
        router.push("/modules")
    }

    function addNotification(text: string, type: NotificationType) {
        setNotifications([...notifications, { text: text, type: type, id: notificationCounter }])
        setNotificationCounter(notificationCounter + 1);

    }
    function removeNotification(notification: Notification) {
        setNotifications(notifications.filter(n => n.id !== notification.id))
    }
    function setStartingSemster(s: Semester) {

    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <UserContext.Provider value={{ user: user, setUser: setUser, setSemester: setStartingSemster }}>
                    <NotificationContext.Provider value={{ notifications: notifications, addNotification: addNotification, deleteNotification: removeNotification }}>
                        <SemesterContext.Provider value={{ getSemesterFromID, possibleSemesters, currentSemester: semester, setSemester: s => setSemester(s) }}>
                            <TopBar user={user} handleLogout={handleLogout}></TopBar>
                            <NotificationDisplay>
                            </NotificationDisplay>
                            {children}</SemesterContext.Provider>
                    </NotificationContext.Provider>
                </UserContext.Provider>
            </body>
        </html>
    );
}
