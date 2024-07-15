import { ModulePart } from "@/app/types";
import { useRouter } from "next/navigation";

export interface ModulePartDisplayProps {
    part: ModulePart
}


export function ModulePartDisplay(props: ModulePartDisplayProps) {
    const router = useRouter();
    function handleClick() {
        router.push("/moduleParts/" + props.part.stringID)
        


    }
    return <div>
        <div className="grid grid-cols-5 border-2 border-black w-2/3 cursor-pointer" onClick={handleClick}>
            <div className="p-1 bg-gray-200">Name</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.part.name}</div>
            <div className="p-1 bg-gray-300">ECTS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{props.part.ects}</div>
            <div className="p-1 bg-gray-200">Kind</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.part.kind}</div>
        </div></div>


}
