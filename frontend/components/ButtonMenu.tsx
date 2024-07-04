import { useOutsideClick } from "@/hooks/useOutsideClick"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
export interface ButtonMenuOption {
    text: string,
    action: () => void

}
export interface ButtonMenuProps {
    options: ButtonMenuOption[]

}
export function ButtonMenu(props: ButtonMenuProps) {
    let [expanded, setExpanded] = useState(false)
    if (props.options.length == 0) {
        props.options.push({ text: "No options available.", action: () => { } })
    }
    let ref = useOutsideClick(() => {
        setExpanded(false)
    })
    function handleClick(option: ButtonMenuOption) {
        option.action();
        setExpanded(false);
    }

    return <div>
        <div className="cursor-pointer" onClick={() => setExpanded(!expanded)}><FontAwesomeIcon icon={faEllipsisVertical} /></div>
        {expanded ? <div ref={ref} className="absolute right-10 border-2 border-black rounded">
            {props.options.map((option, index) => {
                return <div className="cursor-pointer bg-gray-200 hover:bg-gray-300 right-10 p-1" key={index} onClick={() => handleClick(option)}>{option.text}</div>
            })}


        </div> : null}


    </div>
}
