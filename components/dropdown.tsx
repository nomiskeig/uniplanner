import React from "react";
export interface DropdownProps  {
    options: DropdownOption[]
    default: DropdownOption

}

export interface DropdownOption {
    name: String,
    callback: (optionName: string) => void

}

export function Dropdown(props: DropdownProps) {
    let [expanded, setExpanded] = React.useState(false);


    return <div>
        <div>{props.default.name}</div>


    </div>

}
