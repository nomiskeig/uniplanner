"use client"

//import { parseModules } from "../../parsers/infomasterparser.ts"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Module } from "../types.ts";
import modules from "../infomasterModuls.json"
import inDepthModules from "@/parsers/infomasterIndepthModuls.json"
import React from "react";
import { Dropdown, DropdownProps } from "@/components/dropdown.tsx";

const columnHelper = createColumnHelper<Module>();
const columns = [
    columnHelper.accessor('name', {
        cell: info => info.getValue()
    }),
    columnHelper.accessor('ects', {
        cell: info => info.getValue()
    }),
    columnHelper.accessor('turnus', {
        cell: info => info.getValue()
    }),
    columnHelper.accessor('content', {
        cell: info => info.getValue()
    })
]

//let modules = parseModules();


export default function Page() {
    const [data, _setData] = React.useState(() => [...modules])
    const [indepthmodule, setIndepthmodule] = React.useState(inDepthModules[0].name)
    const inDepthPickerOptions: DropdownProps = {
        default: {
            name: "abckj w",
            callback: (newName: string) => setIndepthmodule(newName)
        },
        options:  
            inDepthModules.map(module => ({
                name: module.name,
                callback: (newName: string) => setIndepthmodule(newName)

            })),

    };
    console.log(inDepthPickerOptions.default.name)

    const rerender = React.useReducer(() => ({}), {})[1]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    });


    return <div className="p-10">
        <Dropdown options={inDepthPickerOptions.options} default={inDepthPickerOptions.default}></Dropdown>
        <table className="border border-slate-500">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th className="border border-slate-500" key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <div>{modules.length}</div>

    </div>
}
