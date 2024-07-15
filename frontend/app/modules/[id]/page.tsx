"use client"

import { Module } from "@/app/types"
import { ModulePartDisplay } from "@/components/ModulePartDisplay"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
    const [module, setModule] = useState<Module | null>(null)

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/data/modules/${params.id}`).then((res => res.json())).then((data) => {console.log(data); setModule(data)}).catch(err => console.log(err))
    },[])
    
    if (module == null) {
        return <div>Loading...</div>
    }

    return <div className="p-5 ">
        <div className="text-2xl mb-4">Module</div>
        {params.id}
        <div className="mt-2 mb-10 text-3xl font-bold">{module.name}</div>
        
        <div className="grid grid-cols-5 border-2 border-black w-2/3">
            <div className="p-1 bg-gray-200">Turnus</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{module.turnus}</div>
            <div className="p-1 bg-gray-300">ECTS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{module.ects}</div>
            <div className="p-1 bg-gray-200">Responsible</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{module.responsible}</div>
            <div className="p-1 bg-gray-300">Part of</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">
                {module.categories.map((cat,index) => <div key={index}>{module.categories.length > 1 ? "- " : ""}{cat.name}</div>)}
            </div>
        </div>

        <div className="mt-8 mb-5 text-2xl font-bold">Parts</div>

        <div>
            {module.parts.map((p,i) => <ModulePartDisplay key={i} part={p}></ModulePartDisplay>)}
        </div>

        <div className="mt-8 mb-5 text-2xl font-bold whitespace-pre-line">Qualification goals</div>
        <div className="whitespace-pre-line">{module.qualificationGoals}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Content</div>
        <div className="whitespace-pre-line">{module.content == '' ? "No content" : module.content}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Success control</div>
        <div className="whitespace-pre-line">{module.successControl == '' ? "No info" : module.successControl}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Requirements</div>
        <div>{module.requirements == '' ? "No requirements" : module.requirements}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Recommendations</div>
        <div>{module.recommendations == null  ? "No recommendations" : module.recommendations}</div>
    </div>

}
