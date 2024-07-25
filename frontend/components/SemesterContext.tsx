"use client"

import { Semester } from "@/app/types"
import { createContext } from "react"



export interface ISemesterContext {
    currentSemester: Semester | null,
    possibleSemesters: Semester[]
    getSemesterFromID: (id: string) => Semester
    setSemester: (semester: Semester) => void

}

export const SemesterContext = createContext<ISemesterContext>({ getSemesterFromID: (s) => ({id: "", name:""}), possibleSemesters: [], currentSemester: null, setSemester: () => { } })
