import Link from "next/link"
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { User } from "@/app/types";

const topBarButtonsClasses = "rounded-lg m-2 p-1 bg-blue-400 cursor-pointer w-32 text-center"
export interface TopBarProps {
    handleLogout: () => void,
    user: User

}

export default function TopBar(props: TopBarProps) {
    const userContext = useContext(UserContext);
    const { t } = useTranslation();

    return <div className="flex bg-blue-300 h-12">
        <div className={topBarButtonsClasses}>
            <Link href="/modules">Modules</Link>
        </div>
        <div className={topBarButtonsClasses}>
            <Link href="/plan/categories">Plan</Link>
        </div>
        <div className="flex-1"></div>
        <div className={topBarButtonsClasses}>
            {
                props.user.isLoggedIn ?
                    <div>{t('hello')}, {userContext.user.username}</div> :
                    <Link href="/login">Log in</Link>
            }
        </div>
        {props.user.isLoggedIn && 
            <div className={topBarButtonsClasses}>
                <button onClick={() => props.handleLogout()}>Log out</button>
            </div>}
    </div>

}
