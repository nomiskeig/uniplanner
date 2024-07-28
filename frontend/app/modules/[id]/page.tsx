"use client"

import { API_URL } from "@/app/global";
import { Module } from "@/app/types"
import { ModulePartDisplay } from "@/components/ModulePartDisplay"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

export default function Page({ params }: { params: { id: string } }) {
    const { i18n, t } = useTranslation();
    const [module, setModule] = useState<Module | null>(null)

    useEffect(() => {
        fetch(API_URL + `/api/v1/data/modules/${params.id}`).then((res => res.json())).then((data) => {console.log(data); setModule(data)}).catch(err => console.log(err))
    },[params.id])
    
    if (module == null) {
        return <div>Loading...</div>
    }

    return <div className="p-5 ">
        <div className="text-2xl mb-4">{t('module')}</div>
        {params.id}
        <div className="mt-2 mb-10 text-3xl font-bold">{module.name}</div>
        
        <div className="grid grid-cols-5 border-2 border-black w-2/3">
            <div className="p-1 bg-gray-200">Turnus</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{module.turnus}</div>
            <div className="p-1 bg-gray-300">ECTS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{module.ects}</div>
            <div className="p-1 bg-gray-200">{t('responsible')}</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{module.responsible}</div>
            <div className="p-1 bg-gray-300">{t('partOf')}</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">
                {module.categories.map((cat,index) => <div key={index}>{module.categories.length > 1 ? "- " : ""}{cat.name}</div>)}
            </div>
        </div>

        <div className="mt-8 mb-5 text-2xl font-bold">{t('moduleParts')}</div>

        <div>
            {module.parts.map((p,i) => <ModulePartDisplay key={i} part={p}></ModulePartDisplay>)}
        </div>

        <div className="mt-8 mb-5 text-2xl font-bold whitespace-pre-line">{t('qualificationGoals')}</div>
        <div className="whitespace-pre-line">{module.qualificationGoals}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">{t('content')}</div>
        <div className="whitespace-pre-line">{module.content == '' ? "No content" : module.content}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">{t('successControl')}</div>
        <div className="whitespace-pre-line">{module.successControl == '' ? "No info" : module.successControl}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">{t('requirements')}</div>
        <div>{module.requirements == '' ? "No requirements" : module.requirements}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">{t('recommendations')}</div>
        <div>{module.recommendations == null  ? "No recommendations" : module.recommendations}</div>
    </div>

}
