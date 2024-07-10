"use client"

import { createContext } from "react"

export type NotificationType = "Success" | "Errror" | "Warning"
export interface Notification {
    text: string,
    type: "Success" | "Error" | "Warning",
    id: number
}


export interface INotificationContext {
    notifications: Notification[],
    addNotification: (text: string, type: NotificationType) => void,
    deleteNotification: (notification: Notification) => void


}

export const NotificationContext = createContext<INotificationContext>({ notifications: [], addNotification: () => { }, deleteNotification: () => {} })
