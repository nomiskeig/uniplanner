import { Course, ModulePart } from "@/app/types";
import { useRouter } from "next/navigation";

export interface CourseDisplayProps {
    course: Course
}


export function CourseDisplay(props: CourseDisplayProps) {
    const router = useRouter();
    function handleClick() {
        router.push(props.course.link)
        


    }
    return <div>
        <div className="grid grid-cols-5 border-2 border-black w-2/3 cursor-pointer" onClick={handleClick}>
            <div className="p-1 bg-gray-200">Name</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.course.name}</div>
            <div className="p-1 bg-gray-200">Semester</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.course.semester}</div>
            <div className="p-1 bg-gray-200">SWS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.course.sws}</div>
            <div className="p-1 bg-gray-300">Responsible</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{props.course.responsible}</div>
            <div className="p-1 bg-gray-200">Type</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.course.type}</div>
        </div></div>


}
