"use client"

import { Semester } from "@/app/types"
import { createContext } from "react"



export interface ISemesterContext {
    currentSemester: Semester | null,
    setSemester: (semester: Semester) => void

}

export const SemesterContext = createContext<ISemesterContext>({ currentSemester: null, setSemester: () => { } })
