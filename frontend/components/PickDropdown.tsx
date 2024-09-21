import { useOutsideClick } from "@/hooks/useOutsideClick";
import {DropdownProps, DropdownOption} from "./SelectDropdown"
import React from "react";

export function PickDropdown<T>(props: DropdownProps<T>) {
    let [expanded, setExpanded] = React.useState(false);
    let [current, setCurrent] = React.useState<DropdownOption<T>| null>(props.options[props.defaultIndex]);
    let ref = useOutsideClick(() => { setExpanded(false) });
    if (current == null) {
        return;
    }
    return <div className="w-96">
        <div className="">{props.title}</div>
        <div className="w-full">
            <div
                className={`w-full border border-black p-2 rounded cursor-pointer bg-gray-300 ${expanded ? "after:content-['\\25B2']" : "after:content-['\\25BC']"} after:float-right`}
                onClick={() => { setExpanded(!expanded) }}>Pick...</div>
            {expanded ? <div ref={ref}className="absolute border-black border-2 mt-2 rounded h-96 overflow-scroll w-96">{props.options.map((option, index) => {
                return <div className="cursor-pointer py-1 px-2 hover:bg-gray-300 border-black bg-gray-200 w-96"
                    onClick={() => {
                        option.callback(option.element);
                        setCurrent(option);
                        setExpanded(false);
                    }}
                    key={index}>{option.name}</div>
            })}</div> : null}
        </div>
    </div>

}
