import { useOutsideClick } from "@/hooks/useOutsideClick";
import React from "react";
export interface InlineDropdownProps<T> {
    options: InlineDropdownOption<T>[]
    default: InlineDropdownOption<T>
    title: string

}
export interface InlineDropdownOption<T> {
    text: string,
    element: T
    callback: (option: T) => void

}

export function InlineDropdown<T>(props: InlineDropdownProps<T>) {
    let [expanded, setExpanded] = React.useState(false);
    let [current, setCurrent] = React.useState<InlineDropdownOption<T>>(props.default);
    let ref = useOutsideClick(() => { setExpanded(false) });
    return <div className="w-full">
        <div className="w-full flex">
            <div className="">{props.title}</div>
            <div
                className={`w-full border border-black p-1 rounded cursor-pointer bg-gray-300 ${expanded ? "after:content-['\\25B2']" : "after:content-['\\25BC']"} after:float-right`}
                onClick={() => { setExpanded(!expanded) }}>{current.text}</div>
            {expanded ? <div ref={ref} className="absolute border-black border-2 mt-2 rounded">{props.options.map((option, index) => {
                return <div className="cursor-pointer py-1 px-2 hover:bg-gray-300 border-black bg-gray-200"
                    onClick={() => {
                        option.callback(option.element);
                        setCurrent(option);
                        setExpanded(false);
                    }}
                    key={index}>{option.text}</div>
            })}</div> : null}
        </div>
    </div>
}
