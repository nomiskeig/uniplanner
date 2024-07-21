export interface ButtonProps {
    onClick:  () => void,
    text: string
    className?: string
}


export function Button(props: ButtonProps) {
    return <button className={`border-black text-white shadow-xl shadow-blue-700/40 bg-blue-700 rounded pl-2 pr-2 pt-1 pb-1 text-l ` + props.className} onClick={() => props.onClick()}>{props.text}</button>


}
