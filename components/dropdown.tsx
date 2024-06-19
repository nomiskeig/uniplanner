import { useOutsideClick } from "@/hooks/useOutsideClick";
import React from "react";
export interface DropdownProps {
    options: DropdownOption[]
    default: DropdownOption,
    title: string

}
export interface DropdownOption {
    name: string,
    callback: (optionName: string) => void

}

export function Dropdown(props: DropdownProps) {
    let [expanded, setExpanded] = React.useState(false);
    let [current, setCurrent] = React.useState(props.default);
    let ref= useOutsideClick(() => {setExpanded(false)});
    return <div className="w-full">
        <div className="">{props.title}</div>
        <div className="w-full">
            <div
                className={`w-full border-2 border-black p-2 rounded cursor-pointer bg-gray-300 ${expanded ? "after:content-['\\25B2']" : "after:content-['\\25BC']"} after:float-right`}
                onClick={() => { setExpanded(!expanded) }}>{current.name}</div>
            {expanded ? <div className="absolute border-black border-2 mt-2 rounded">{props.options.map((option, index) => {
                return <div className="cursor-pointer py-1 px-2 hover:bg-gray-300 border-black bg-gray-200"
                    onClick={() => {
                        option.callback(option.name);
                        setCurrent(option);
                        setExpanded(false);
                    }}
                    key={index}>{option.name}</div>
            })}</div> : null}
        </div>
    </div>

}
