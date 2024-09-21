import Link from "next/link"
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { User } from "@/app/types";

const topBarButtonsClasses = "p-1 bg-gray-400 cursor-pointer w-32"
export interface TopBarProps {
    handleLogout: () => void,
    user: User

}

export default function TopBar(props: TopBarProps) {
    const userContext = useContext(UserContext);
    const { t } = useTranslation();

    return <div className="flex">
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
        <div className={topBarButtonsClasses}>
            {props.user.isLoggedIn ?
                <button onClick={() => props.handleLogout()}>Log out</button> : <div></div>}
        </div>
    </div>

}
