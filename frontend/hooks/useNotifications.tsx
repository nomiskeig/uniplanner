import { NotificationContext } from "@/components/NotificationContext"
import { useContext } from "react"

export function useNotificiations() {
    const notifactionContenxt = useContext(NotificationContext)
    return { addNotification: notifactionContenxt.addNotification }

}
