"use client"

import { Module, ModulePart } from "@/app/types"
import { CourseDisplay } from "@/components/CourseDisplay"
import { ModulePartDisplay } from "@/components/ModulePartDisplay"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
    const [modulePart, setModulePart] = useState<ModulePart | null>(null)

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/data/moduleParts/${params.id}`).then((res => res.json())).then((data) => setModulePart(data)).catch(err => console.log(err))
    }, [])

    if (modulePart == null) {
        return <div>Loading...</div>
    }

    return <div className="p-5 ">
        <div className="text-2xl mb-4">Module part</div>
        {params.id}
        <div className="mt-2 mb-10 text-3xl font-bold">{modulePart.name}</div>

        <div className="grid grid-cols-5 border-2 border-black w-2/3">
            <div className="p-1 bg-gray-300">ECTS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{modulePart.ects}</div>
            <div className="p-1 bg-gray-300">Type</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{modulePart.kind}</div>
        </div>

        <div className="mt-8 mb-5 text-2xl font-bold">Courses</div>

        <div>
            {modulePart.courses.map((c,i) => <CourseDisplay key={i} course={c}></CourseDisplay>)}
        </div>


        <div className="mt-8 mb-5 text-2xl font-bold">Success control</div>
        <div className="whitespace-pre-line">{modulePart.successControl == '' ? "No info" : modulePart.successControl}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Requirements</div>
        <div>{modulePart.requirements == '' ? "No requirements" : modulePart.requirements}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Recommendations</div>
        <div className="">{modulePart.recommendations == '' ? "No recommendations" : modulePart.recommendations}</div>
    </div>

}
