import { UserContext } from "@/components/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";


export interface User {
    username: string,
    token: string
}

export const useLogin = ((redirectIfLoggedIn: string, redirectToLogin: boolean) => {

    const userContext = useContext(UserContext)
    const router = useRouter();

    useEffect(() => {
        if (document.cookie.includes("token")) {
            let token = document.cookie.match(/token=(.*);/)![1]
            let username = document.cookie.match(/username=(.*)/)![1]
            userContext.setUser({ username: username, token: token, isLoggedIn: true })
            router.push(redirectIfLoggedIn)
        } else {
            if (redirectToLogin) {
                router.push("/login")
            }
        }
    }, [])
    return { isLoggedIn: userContext.user.isLoggedIn, user: userContext.user };



})
