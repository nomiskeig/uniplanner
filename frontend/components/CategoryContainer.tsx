import { Category, Module, PickedModule, Semester } from "@/app/types"
import { createClass } from "@/utils"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Link from "next/link"
import { useContext } from "react"
import { SemesterContext } from "./SemesterContext"
import { InlineDropdown, InlineDropdownOption, InlineDropdownProps } from "./InlineDropdown"
import { UserContext } from "./UserContext"

export interface CategoryContainerProps {
    name: string
    data: PickedModule[]
    category: Category

}


function getBackgroundColor(currentECTS: number, min: number, max: number) {
    if (currentECTS <= max && currentECTS >= min) {
        return "bg-green-100"
    }
    return "bg-red-100"

}
export function CategoryContainer(props: CategoryContainerProps) {
    console.log(props.data)
    const semesterContext = useContext(SemesterContext);
    const columnHelper = createColumnHelper<PickedModule>()
    const { user } = useContext(UserContext);
    const columns = [
        columnHelper.accessor('module.name', {

            header: e => <span>Name</span>,
            cell: info => {
                return <Link href={`/modules/${info.row.original.module.stringID}`}>{info.getValue()}</Link>
            }

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
        })

    ]
    const currentECTS: number = props.data.map(m => m.module).reduce((acc, curr) => acc += +curr.ects, 0)
    const table = useReactTable({
        data: props.data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return <div className={createClass("m-2", "p-2", "border-slate-950", "border-2", getBackgroundColor(currentECTS, props.category.minECTS, props.category.maxECTS))}>

        <div className="text-xl font-bold">{props.name}</div>
        <div className="text-xl"> {props.category.name}</div>
        <div className="justify-self-end">ECTS: {currentECTS} of {props.category.minECTS}-{props.category.maxECTS}</div>
        <div>
            <table className="table-fixed border-gray-500 border-2 w-full">
                <thead>{table.getHeaderGroups().map(headerGroup => (
                    <tr className="border-slate-500 border-b-2 bg-gray-400" key={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => <th className={`${index == 2 ? "w-20 border-l-2 border-gray-500" : index == 1 ? "w-48" : ""}`} key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
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
