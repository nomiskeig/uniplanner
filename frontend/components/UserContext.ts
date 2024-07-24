"use client"

import { Semester, User } from '@/app/types'
import { createContext } from 'react'

export interface IUserContext {
    setSemester(s: Semester): void 
    user: User,
    setUser: (user: User) => void
}
// used to store information about the currently logged in user
export const UserContext = createContext<IUserContext>({ user: { token: "", username: "", isLoggedIn: false, startingSemester: {
    id: "",
    name: ""
} }, setUser: () => { }, setSemester: () => {} })
