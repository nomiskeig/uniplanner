"use client"

import { API_URL } from "@/app/global"
import { Module, ModulePart } from "@/app/types"
import { CourseDisplay } from "@/components/CourseDisplay"
import { ModulePartDisplay } from "@/components/ModulePartDisplay"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

export default function Page({ params }: { params: { id: string } }) {
    const [modulePart, setModulePart] = useState<ModulePart | null>(null)
    const {t} = useTranslation();

    useEffect(() => {
        fetch(API_URL + `/api/v1/data/moduleParts/${params.id}`).then((res => res.json())).then((data) => setModulePart(data)).catch(err => console.log(err))
    }, [params.id])

    if (modulePart == null) {
        return <div>Loading...</div>
    }

    return <div className="p-5 ">
        <div className="text-2xl mb-4">{t('modulePart')}</div>
        {params.id}
        <div className="mt-2 mb-10 text-3xl font-bold">{modulePart.name}</div>

        <div className="grid grid-cols-5 border-2 border-black w-2/3">
            <div className="p-1 bg-gray-200">ECTS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{modulePart.ects}</div>
            <div className="p-1 bg-gray-300">{t('examKind')}</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{modulePart.kind}</div>
        </div>

        <div className="mt-8 mb-5 text-2xl font-bold">{t('courses')}</div>

        <div className="flex flex-col gap-4">
            {modulePart.courses.map((c,i) => <CourseDisplay key={i} course={c}></CourseDisplay>)}
        </div>


        <div className="mt-8 mb-5 text-2xl font-bold">{t('successControl')}</div>
        <div className="whitespace-pre-line">{modulePart.successControl == '' ? t('noInfo') : modulePart.successControl}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">{t('requirements')}</div>
        <div>{modulePart.requirements == '' ? t("noRequirements") : modulePart.requirements}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">{t('recommendations')}</div>
        <div className="">{modulePart.recommendations == '' ? t('noRecommendations') : modulePart.recommendations}</div>
    </div>

}
