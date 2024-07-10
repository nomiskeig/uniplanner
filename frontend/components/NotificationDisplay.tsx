import { PropsWithChildren, useContext } from "react";
import { NotificationContext } from "./NotificationContext";

export interface NotificationDisplayProps {

}

export function NotificationDisplay(props: NotificationDisplayProps) {
    const notificationContext = useContext(NotificationContext)
    return <div className="absolute right-[30px] top-[30px] w-[500px] rounded flex flex-col gap-4">
        {notificationContext.notifications.map(not => {
            if (not.type == "Error") {
                return <div className="p-2 rounded bg-red-400">Error: {not.text}</div>
            }
            if (not.type == "Success") {
                return <div className="p-2 rounded bg-green-400">Success</div>
            }
            if (not.type == "Warning") {
                return <div className="p-2 rounded bg-orange-400">Warning: {not.text}</div>
            }
        })}



    </div>

}
