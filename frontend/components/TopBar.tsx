import { User } from "@/app/types"
import Link from "next/link"

const topBarButtonsClasses = "p-1 bg-gray-400 cursor-pointer w-32"
export interface TopBarProps {
    handleLogout: () => void,
    user: User

}


export default function TopBar(props: TopBarProps) {
    return <div className="flex">
        <div className={topBarButtonsClasses}>
            <Link href="/modules">Modules</Link>
        </div>
        <div className={topBarButtonsClasses}>
            <Link href="/plan">Plan</Link>
        </div>
        <div className="flex-1"></div>
        <div className={topBarButtonsClasses}>
            {
            props.user.isLoggedIn ? 
            <div>Hello, {props.user.username}</div> :
            <Link href="/login">Log in</Link>
            }
        </div>
        <div className={topBarButtonsClasses}>
            <button onClick={() => props.handleLogout()}>Log out</button>
        </div>
    </div>

}
