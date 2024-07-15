import { Course, ModulePart } from "@/app/types";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export interface CourseDisplayProps {
    course: Course
}


export function CourseDisplay(props: CourseDisplayProps) {
    const router = useRouter();
    const {t} = useTranslation();
    function handleClick() {
        router.push(props.course.link)
        


    }
    return <div>
        <div className="grid grid-cols-5 border-2 border-black w-2/3 cursor-pointer" onClick={handleClick}>
            <div className="p-1 bg-gray-200">Name</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.course.name}</div>
            <div className="p-1 bg-gray-300">ID</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{props.course.id}</div>
            <div className="p-1 bg-gray-200">Semester</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.course.semester}</div>
            <div className="p-1 bg-gray-300">SWS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{props.course.sws}</div>
            <div className="p-1 bg-gray-200">{t('responsible')}</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{props.course.responsible}</div>
            <div className="p-1 bg-gray-300">{t('type')}</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{props.course.type}</div>
        </div></div>


}
