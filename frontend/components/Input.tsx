
export interface InputProps {
    value: string,
    onChange: (newValue: string) => void 
    type: "text" | "password",
    title: string

}

export function Input(props: InputProps) {

    return <div>
        <div>{props.title}</div>
        <input type={props.type} onInput={(e) => props.onChange(e.currentTarget.value) }/>

    </div>
    

} 
