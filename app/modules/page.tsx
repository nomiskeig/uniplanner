"use client"

//import { parseModules } from "../../parsers/infomasterparser.ts"
import { ColumnFiltersState, FilterFn, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { InDepthModule, Module } from "../types.ts";
import modules from "../../parsers/infomasterModuls.json"
import inDepthModules from "@/parsers/infomasterIndepthModuls.json"
import React from "react";
import { Dropdown, DropdownProps } from "@/components/dropdown.tsx";
import Link from "next/link";



const columnHelper = createColumnHelper<Module>();
const columns = [
    columnHelper.accessor('name', {
        cell: info => <Link href={`/modules/${info.row.getValue("id")}`}>{info.getValue()}</Link>
    }),
    columnHelper.accessor('ects', {
        cell: info => info.getValue(),
        id: "ects"
    }),
    columnHelper.accessor('turnus', {
        cell: info => info.getValue(),
        id: "turnus",
        filterFn: (row, columnId, filterValue) => {
            const turnus: string = row.getValue(columnId);
            if (turnus == filterValue || filterValue == "anytime") {
                return true;
            }
            return false;
        }
    }),
    columnHelper.accessor('partOf', {
        cell: info => info,
        id: "indepthmodule",
        filterFn: (row, columnId, filterValue) => {
            const idmodules: InDepthModule[] = row.getValue(columnId);
            for (let idmodule of idmodules) {
                if (idmodule.name == filterValue) {
                    return true;
                }
            }
            return false;
        }
    }),
    columnHelper.accessor('id', {
        cell: info => info.getValue(),
        id: "id"
    })

]

//let modules = parseModules();
const turnusPossibilities: string[] = [];
turnusPossibilities.push("anytime")
for (let module of modules) {
    if (!turnusPossibilities.includes(module.turnus)) {
        turnusPossibilities.push(module.turnus)
    }
}


export default function Page() {
    const [data, _setData] = React.useState(() => [...modules])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const inDepthPickerOptions: DropdownProps = {
        title: "In depth module",
        default: {
            name: "all modules",
            callback: (newName: string) => { }
        },
        options:
            inDepthModules.map(module => ({
                name: module.name,
                callback: (newName: string) => setColumnFilters(([...columnFilters, { id: "indepthmodule", value: newName }]))
            })),

    };
    const turnusPickerOptions: DropdownProps = {
        title: "Turnus",
        default: {
            name: "anytime",
            callback: (newName: string) => { }
        },
        options:
            turnusPossibilities.map(pos => ({
                name: pos,
                callback: (newName: string) => setColumnFilters(([...columnFilters, { id: "turnus", value: newName }]))

            }))


    }

    const rerender = React.useReducer(() => ({}), {})[1]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {},
        state: {
            columnFilters,
            columnVisibility: {
                indepthmodule: false,
                id: false
            }

        }

    }


    );


    return <div className="p-5 bg-[#eeeeee] ">
        <div className="mb-10 text-3xl font-bold">Modules overview</div>
        <div className="flex mb-10 gap-6">
            <Dropdown title={inDepthPickerOptions.title} options={inDepthPickerOptions.options} default={inDepthPickerOptions.default}></Dropdown>
            <Dropdown title={turnusPickerOptions.title} options={turnusPickerOptions.options} default={turnusPickerOptions.default}></Dropdown>
        </div>
        <table className="border border-gray-500 border-2 w-full">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th className="border border-gray-500 border-2 bg-gray-400" key={header.id}>
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
                {table.getRowModel().rows.map((row, index) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td className={`${index % 2 == 0 ? "bg-gray-300" : "bg-gray-200"} pl-2 border-l border-gray-500`} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
}
