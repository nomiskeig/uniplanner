
export interface InputProps {
    value: string,
    onChange: (newValue: string) => void 
    type: "text" | "password",
    title: string

}

export function Input(props: InputProps) {

    return <div className="">
        <div className="mb-1">{props.title}</div>
        <input className="p-1 rounded" type={props.type} onInput={(e) => props.onChange(e.currentTarget.value) }/>

    </div>
    

} 
