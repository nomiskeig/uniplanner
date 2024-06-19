import modules from "../../../parsers/infomasterModuls.json"

export default function Page({ params }: { params: { id: string } }) {
    const module = modules.find(elem => elem.id == params.id)!
    console.log("content", module.content)
    return <div className="p-5 ">
        {params.id}
        <div className="mt-2 mb-10 text-3xl font-bold">{module.name.replaceAll("\n", "test")}</div>
        
        <div className="grid grid-cols-5 border-2 border-black w-2/3">
            <div className="p-1 bg-gray-200">Turnus</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{module.turnus}</div>
            <div className="p-1 bg-gray-300">ECTS</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">{module.ects}</div>
            <div className="p-1 bg-gray-200">Responsible</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-200">{module.responsible}</div>
            <div className="p-1 bg-gray-300">Part of</div>
            <div className="col-span-4 border-l border-black p-1 bg-gray-300">
            {module.partOf.filter(module => module.name != "all modules").map(indephmodule => {
                return <div>{module.partOf.length >= 3 ? "- " : ""}{indephmodule.name}</div>

            })}
            </div>
        </div>

        <div className="mt-8 mb-5 text-2xl font-bold">Courses</div>
        <div>{module.compulsoryParts}</div>

        <div className="mt-8 mb-5 text-2xl font-bold">Qualification goals</div>
        <div>{module.qualificationGoals}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Content</div>
        <div>{module.content == '' ? "No content" : module.content}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Requirements</div>
        <div>{module.requirements == '' ? "No requirements" : module.requirements}</div>
        <div className="mt-8 mb-5 text-2xl font-bold">Recommendations</div>
        <div>{module.recommendations == null  ? "No recommendations" : module.recommendations}</div>
    </div>

}
