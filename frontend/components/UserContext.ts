"use client"

import { User } from '@/app/types'
import { createContext } from 'react'

export interface IUserContext {
    user: User,
    setUser: (user: User) => void
}
// used to store information about the currently logged in user
export const UserContext = createContext<IUserContext>({ user: { token: "", username: "", isLoggedIn: false }, setUser: () => { } })
