import { Category, Module, PickedModule, Semester } from "@/app/types"
import { createClass } from "@/utils"
import { createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import Link from "next/link"
import { useNotificiations } from "@/hooks/useNotifications";
import { useContext } from "react"
import { SemesterContext } from "./SemesterContext"
import { InlineDropdown, InlineDropdownOption, InlineDropdownProps } from "./InlineDropdown"
import { PickDropdown } from "./PickDropdown"
import { UserContext } from "./UserContext"
import { API_URL } from "@/app/global"
import { ButtonMenu } from "./ButtonMenu"


export interface CategoryContainerProps {
    name: string
    data: PickedModule[]
    category: Category
    modulesOfCategory: Module[],
    reloadModulePicks: () => void

}


function getBackgroundColor(currentECTS: number, min: number, max: number) {
    if (currentECTS <= max && currentECTS >= min) {
        return "bg-green-100"
    }
    return "bg-red-100"

}
export function CategoryContainer(props: CategoryContainerProps) {
    const semesterContext = useContext(SemesterContext);
    const columnHelper = createColumnHelper<PickedModule>()
    const { user } = useContext(UserContext);
    const { addNotification } = useNotificiations();
    const columns = [
        columnHelper.accessor('module.name', {
            header: e => <span>Name</span>,
            cell: info => {
                return <Link href={`/modules/${info.row.original.module.stringID}`}>{info.getValue()}</Link>
            },
            id: 'name'

        }),
        columnHelper.accessor('semester.name', {
            header: e => <span>Semester</span>,
            cell: info => {
                const options: InlineDropdownOption<Semester>[] = semesterContext.possibleSemesters.map(s => ({
                    element: s,
                    text: s.name,
                    callback: (s) => {
                        const update = {
                            moduleID: info.row.original.module.moduleID,
                            categoryID: info.row.original.category.categoryID,
                            semesterID: s.id

                        }
                        fetch('http://localhost:8080/api/v1/plan/updateModulePick', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + user.token
                            },
                            body: JSON.stringify(update)


                        }
                        )


                    }
                }))
                let defaultSemester: InlineDropdownOption<Semester>;
                if (info.row.original.semester == null) {
                    defaultSemester = {
                        text: "No semester  selected",
                        element: {
                            id: "-1",
                            name: "Not picked"
                        },
                        callback: () => { }


                    }
                } else {
                    defaultSemester = options.find(o => o.element.id == info.row.original.semester!.id)!;
                }
                return <InlineDropdown title="" options={options} default={defaultSemester}></InlineDropdown>

            }
        }),
        columnHelper.accessor('module.ects', {
            header: e => <span>ECTS</span>,
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id: 'actions',
            cell: localProps => <div><ButtonMenu options={[{
                text: "Remove", action: () => {
                    fetch(API_URL + "/api/v1/plan/removeModulePick", {
                        method: "POST",
                        headers: {
                            'Authorization': "Bearer " + user.token,
                            'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                        body: JSON.stringify({
                            "categoryID": localProps.row.original.category.categoryID,
                            "moduleID": localProps.row.original.module.moduleID
                        }),
                    }).then(() => props.reloadModulePicks())

                }
            }]}></ButtonMenu></div>
        })

    ]
    const currentECTS: number = props.data.map(m => m.module).reduce((acc, curr) => acc += +curr.ects, 0)
    const table = useReactTable({
        data: props.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            sorting: [
                { id: 'name', desc: false }
            ]
        }
    })
    return <div className={createClass("m-2", "p-2", "border-slate-950", "border-2", getBackgroundColor(currentECTS, props.category.minECTS, props.category.maxECTS))}>

        <div className="flex flex-row">
            <div>
                <div className="text-xl font-bold">{props.name}</div>
                <div className="text-xl"> {props.category.name}</div>
                <div className="justify-self-end">ECTS: {currentECTS} of {props.category.minECTS}-{props.category.maxECTS}</div>
            </div>
            <div className="ml-auto">
                <PickDropdown<Module> options={props.modulesOfCategory.map(m => ({
                    name: m.name,
                    element: m,
                    callback: () => {
                        fetch(API_URL + "/api/v1/plan/addModulePick", {
                            method: "POST",
                            headers: {
                                'Authorization': "Bearer " + user.token,
                                'Content-Type': 'application/json',
                            },
                            mode: 'cors',
                            body: JSON.stringify({
                                "categoryID": props.category.categoryID,
                                "moduleID": m.moduleID
                            })
                        }).then(res => {
                            if (!res.ok) {
                                res.json().then(data => addNotification("Error when adding module: " + data.message, "Error"));
                                    throw res

                            }
                            props.reloadModulePicks()
                        })
                    }
                }))}
                    title="Add module" defaultIndex={1} showSelectedElement={false}></PickDropdown>

            </div>
        </div>
        <div>
            <table className="table-fixed border-gray-500 border-2 w-full">
                <thead>{table.getHeaderGroups().map(headerGroup => (
                    <tr className="border-slate-500 border-b-2 bg-gray-400" key={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => <th className={`${index == 2 ? "w-20 border-l-2 border-gray-500" : index == 1 ? "w-48 border-l-2 border-gray-500" : index == 3 ? "w-8 border-l-2 border-gray-500" : ""}`} key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : <div className="cursor-pointer" onClick={header.column.getToggleSortingHandler()}>{flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}</div>}
                        </th>)}
                    </tr>
                ))}</thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr className={`p-2`} key={row.id}>
                            {row.getVisibleCells().map(cell => (<td className={`${index % 2 == 0 ? "bg-gray-200" : "bg-gray-300"} p-1 border-l-2 border-gray-500`} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}
