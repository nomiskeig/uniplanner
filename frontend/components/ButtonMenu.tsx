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


    return <div>
        <div onClick={() => setExpanded(true)}>Options</div>
        {expanded ? <div>
            {props.options.map((option, index) => {
                return <div className="cursor-pointer bg-gray-400 " key={index} onClick={() => option.action()}>{option.text}</div>
            })}
            

        </div> : null} 

        
    </div>
}
