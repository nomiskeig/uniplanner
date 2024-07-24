import { Semester, User } from "@/app/types"
import Link from "next/link"
import { useTranslation } from "react-i18next";
import { InlineDropdown, InlineDropdownOption } from './InlineDropdown'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { SemesterContext } from "./SemesterContext";

const topBarButtonsClasses = "p-1 bg-gray-400 cursor-pointer w-32"
export interface TopBarProps {
    handleLogout: () => void,
    user: User

}
const semesters: string[] = [
    'W2024', 'S2025', 'W2026'

]

export function getSemesterFromID(id: string): Semester {
    const name = id.at(0) == "W" ? "Winter " + id.substring(1) : "Summer " + id.substring(1);
    return {
        name: name,
        id: id
    }

}



export default function TopBar(props: TopBarProps) {
    const semesterContext = useContext(SemesterContext);
    const [currentSemester, setCurrentSemester] = useState<InlineDropdownOption<Semester> | null>(null);
    const userContext = useContext(UserContext);
    const { t } = useTranslation();


    const semesterItems: InlineDropdownOption<Semester>[] = semesters.map(s => getSemesterFromID(s)).map(s => {
        return {
            text: s.name,
            element: s,
            callback: (s: Semester) => {
                semesterContext.setSemester(s)

            }

        }
    })
    useEffect(() => {
        if (semesterContext.currentSemester == null) {
            return;
        }
        const currentSemester = semesterItems.find(sItem => sItem.element.id == semesterContext.currentSemester!.id)
        setCurrentSemester(currentSemester ? currentSemester : null);

    }, [semesterContext.currentSemester])







    return <div className="flex">
        <div className={topBarButtonsClasses}>
            <Link href="/modules">Modules</Link>
        </div>
        <div className={topBarButtonsClasses}>
            <Link href="/plan">Plan</Link>
        </div>
        <div className="flex-1"></div>
        <div>
            {currentSemester ?
                <InlineDropdown title={"Starting semester: "} options={semesterItems} default={currentSemester}></InlineDropdown>
                : <div></div>}
        </div>
        <div className={topBarButtonsClasses}>
            {
                props.user.isLoggedIn ?
                    <div>{t('hello')}, {userContext.user.username}</div> :
                    <Link href="/login">Log in</Link>
            }
        </div>
        <div className={topBarButtonsClasses}>
            <button onClick={() => props.handleLogout()}>Log out</button>
        </div>
    </div>

}
