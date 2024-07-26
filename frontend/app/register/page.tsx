"use client"


import { Button } from "@/components/Button";
import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { Input } from "@/components/Input";
import { SemesterContext } from "@/components/SemesterContext";
import { UserContext } from "@/components/UserContext";
import { useNotificiations } from "@/hooks/useNotifications";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { Semester } from "../types";

function writeToCookie(token: string, username: string) {
    document.cookie = "token=" + token
    document.cookie = "username=" + username
}

export default function Page() {
    const [usernameInput, setUsernameInput] = React.useState<string>("");
    const [passwordInput, setPasswordInput] = React.useState<string>("");
    const [passwordInput2, setPasswordInput2] = React.useState<string>("");
    const { addNotification } = useNotificiations();
    const {possibleSemesters} = useContext(SemesterContext);
    const [pickedSemester, setPickedSemester] = React.useState<Semester| null>(null)

    const router = useRouter();
    const semesterOptions: DropdownOption<Semester>[] = possibleSemesters.map(s => ({
        element: s,
        name: s.name,
        callback: (s) => setPickedSemester(s)
    }))

    function handleRegister() {
        if (passwordInput != passwordInput2) {
            addNotification("Passwords do not match", "Error")
            return;
        }
        let semester = pickedSemester;
        if (pickedSemester == null) {
            semester = possibleSemesters[0]

        }
        fetch("http://localhost:8080/api/v1/users/register", {
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            method: 'POST', body: JSON.stringify(
                {
                    "password": passwordInput,
                    "username": usernameInput,
                    "startingSemester": semester!.id 
                }
            )
        })
            .then(res => {
                if (!res.ok) {
                    res.json().then(data => addNotification("Error when registering: " + data.message, "Error"));
                    throw res
                }
            })
            .then(data => { addNotification("Sucessfully registered", "Success"); router.push("/login") })
            .catch(err => console.log(err.message))


    }
    if (possibleSemesters.length == 0) {
        return;
    }

    return <div className="h-screen flex items-center justify-center">
        <div className="bg-slate-400 p-20 rounded-3xl shadow-xl shadow-slate-400/40">
            <div className="text-2xl pb-3">Register</div>
            <div className="flex gap-4 flex-col">
                <Input title={"Username"} type={"text"} value={usernameInput} onChange={(newValue: string) => setUsernameInput(newValue)}></Input>
                <Input title={"Password"} type={"password"} value={passwordInput} onChange={(newValue: string) => setPasswordInput(newValue)}></Input>
                <Input title={"Repeat password"} type={"password"} value={passwordInput2} onChange={(newValue: string) => setPasswordInput2(newValue)}></Input>
                <Dropdown options={semesterOptions} defaultIndex={0} title="Pick the starting semester"></Dropdown>
            </div>
            <Button className="mt-10"onClick={handleRegister} text={"Register"}></Button>
        </div>

    </div>
}

