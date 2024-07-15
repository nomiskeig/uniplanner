import { Category, Module } from "@/app/types"
import { createClass } from "@/utils"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Link from "next/link"

export interface CategoryContainerProps {
    name: string
    modules: Module[]
    category: Category

}


function getBackgroundColor(currentECTS: number, min: number, max: number) {
    if (currentECTS <= max && currentECTS >= min) {
        return "bg-green-100"
    }
    return "bg-red-100"

}
const columnHelper = createColumnHelper<Module>()
const columns = [
    columnHelper.accessor('name', {
        cell: info =>{ 
                return <Link href={`/modules/${info.row.original.stringID}`}>{info.getValue()}</Link>
        }

    }),
    columnHelper.accessor('ects', {
        cell: info => info.getValue()
    })

]
export function CategoryContainer(props: CategoryContainerProps) {
    const currentECTS: number = props.modules.reduce((acc, curr) => acc += +curr.ects, 0)
    const table = useReactTable({
        data: props.modules,
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
                    <tr className="border-slate-500 border-b-2 bg-gray-400"key={headerGroup.id}>
                        {headerGroup.headers.map((header,index) => <th className={`${index == 1 ? "w-20 border-l-2 border-gray-500" : ""}`} key={header.id}>
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
                        <tr className={`p-2`}key={row.id}>
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
