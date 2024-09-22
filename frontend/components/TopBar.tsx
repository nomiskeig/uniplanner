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
        <Link className={topBarButtonsClasses} href="/modules">Modules</Link>
        <Link className={topBarButtonsClasses} href="/plan/categories">Plan</Link>
        <div className="flex-1"></div>
        {props.user.isLoggedIn ?
            <div className={topBarButtonsClasses}>{t('hello')}, {userContext.user.username}</div> :
            <Link className={topBarButtonsClasses} href="/login">Log in</Link>
        }
        {props.user.isLoggedIn && <button className={topBarButtonsClasses} onClick={() => props.handleLogout()}>Log out</button>}

    </div>
}
