import { PropsWithChildren, useContext } from "react";
import { NotificationContext, Notification } from "./NotificationContext";

export interface NotificationDisplayProps {

}

export function NotificationDisplay(props: NotificationDisplayProps) {
    const notificationContext = useContext(NotificationContext)
    function getText(not: Notification) {
        switch (not.type) {
            case "Error": return "Error: " + not.text
            case "Success": return "Success: " + not.text
            case "Warning": return "Warning: " + not.text
        }

    }
    function getColor(not: Notification) {
        switch (not.type) {
            case "Error": return "bg-red-400"
            case "Success": return "bg-green-400"
            case "Warning": return "bg-orange-400"
        }
    }
    return <div className="fixed right-[30px] top-[30px] w-[500px] rounded flex flex-col gap-4">
        {notificationContext.notifications.map((not,index) => {
            return <div key={index} className={`flex p-2 rounded ${getColor(not)}`}>
                <div className="grow">{getText(not)}</div>
                <div className="cursor-pointer"onClick={() => notificationContext.deleteNotification(not)}>x</div>
                </div>


        })}



    </div>

}
