"use client"

//import { parseModules } from "../../parsers/infomasterparser.ts"
import { ColumnFiltersState, FilterFn, createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { Category, CategoryType, InDepthModule, Module, PickedCategories, PickedModule, Turnus } from "../types.ts";
import React, { useContext, useEffect, useState } from "react";
import { Dropdown, DropdownProps } from "@/components/Dropdown.tsx";
import Link from "next/link";
import { UserContext } from "@/components/UserContext.ts";
import { ButtonMenu, ButtonMenuOption } from "@/components/ButtonMenu.tsx";
import { useGetPickedModules } from "@/hooks/useGetPickedModules.tsx";
import { useLogin } from "@/hooks/useLogin.tsx";






export default function Page() {

    const [modules, setModules] = React.useState<Module[]>(() => [])
    const [studyCourse, setStudyCourse] = React.useState<number>(1);
    const [categories, setCategories] = React.useState<Category[]>(() => [])
    const [categoryTypes, setCategoryTypes] = React.useState<CategoryType[]>(() => [])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [currentCategoryType, setCurrentCategoryType] = React.useState<CategoryType>({ name: "All categories", typeID: 0, categories: [] });
    const [pickedCategories, setPickedCategories] = useState<PickedCategories | {}>({})
    const columnHelper = createColumnHelper<Module>();
    const { isLoggedIn, user } = useLogin("/modules", false);

    const { pickedModules } = useGetPickedModules(user.token);
    const columns = [


        columnHelper.accessor('name', {
            cell: info => {
                return <Link href={`/modules/${info.row.getValue("id")}`}>{info.getValue()}</Link>
            }
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
                if (turnus == filterValue.name || filterValue.name == "Any turnus") {
                    return true;
                }
                return false;
            }
        }),
        columnHelper.accessor('moduleID', {
            cell: info => info.getValue(),
            id: "id",
            filterFn: (row, columnId, filterValue) => {
                const id: number = row.getValue(columnId);
                return filterValue.includes(id);

            }

        }),
        columnHelper.display({
            id: 'actions',
            cell: props => <ButtonMenu options={getButtonMenuOptions(props.row.original)}></ButtonMenu>
        })

    ]

    function getButtonMenuOptions(module: Module): ButtonMenuOption[] {
        // find the categories which the module can belong to
        let possibleCategories = module.categories.filter(cat => (cat.type.name != "inDepth" && cat.type.name != "supplementary") || Object.values(pickedCategories).map(cat => cat.categoryID).includes(cat.categoryID))

        // check if the one of the possible categories is already picked, cause it is not possible to add the module to another category
        // if this is the case, return 
        let categoryOfModule: Category | undefined;
        const isAlreadyPicked = pickedModules.filter(pm => {
            if (pm.module.moduleID != module.moduleID) {
                return false;
            }

            categoryOfModule = possibleCategories.find(pc => pc.categoryID == pm.category.categoryID)
            return categoryOfModule != undefined
        }
        ).length > 0 ? true : false
        if (isAlreadyPicked) {
            return [{
                text: "Remove from " + categoryOfModule!.name, action: () => {
                    fetch("http://localhost:8080/api/v1/plan/removeModulePick", {
                        method: "POST",
                        headers: {
                            'Authorization': "Bearer " + user.token,
                            'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                        body: JSON.stringify({
                            "categoryID": categoryOfModule!.categoryID,
                            "moduleID": module.moduleID
                        }),
                    })
                }
            }]


        }

        return possibleCategories.map((cat) => {
            return {
                text: "Add to " + cat.name, action: () => {
                    fetch("http://localhost:8080/api/v1/plan/addModulePick", {
                        method: "POST",
                        headers: {
                            'Authorization': "Bearer " + user.token,
                            'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                        body: JSON.stringify({
                            "categoryID": cat.categoryID,
                            "moduleID": module.moduleID
                        }),
                    }).then()
                }

            }
        })

    }


    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/data/modules?studyCourseID=${studyCourse}`).then((res => res.json())).then((data) => setModules(data.data)).catch(err => console.log(err))
        fetch(`http://localhost:8080/api/v1/data/categories?studyCourseID=${studyCourse}`).then((res => res.json())).then((data) => setCategories(data.data)).catch(err => console.log(err))
        fetch(`http://localhost:8080/api/v1/data/categoryTypes?studyCourseID=${studyCourse}`).then((res => res.json())).then((data) => setCategoryTypes(data.data)).catch(err => console.log(err))
    }, [])
    useEffect(() => {
        if (user.isLoggedIn) {
            fetch('http://localhost:8080/api/v1/plan/getCategoryPicks', {
                method: 'GET', headers: {
                    'Authorization': "Bearer " + user.token
                }
            }).then((res) => res.json()).then(data => setPickedCategories(data))

        }

    }, [])


    const turnusPossibilities: Turnus[] = [];
    turnusPossibilities.push({ name: "Any turnus" })
    function isIncluded(turnuse: Turnus[], t: Module): boolean {
        for (let turnus of turnuse) {
            if (turnus.name == t.turnus) {
                return true;
            }
        }
        return false;

    }
    for (let module of modules) {
        if (!isIncluded(turnusPossibilities, module)) {
            turnusPossibilities.push({ name: module.turnus })
        }
    }
    const inDepthPickerOptions: DropdownProps<Category> = {
        title: "In depth module",
        defaultIndex: 0,
        options:
            categories.filter(cat => cat.type.name == "inDepth").map(cat => ({
                element: cat,
                name: cat.name,
                callback: (newCat: Category) => {
                    setColumnFilters(([...columnFilters.filter(item => item.id != 'id'), {
                        id: "id",
                        value: newCat.modules.map(m => m.moduleID)
                    }]))
                }
            })),

    };
    const supplementaryPickerOptions: DropdownProps<Category> = {
        title: "Supplementary module",
        defaultIndex: 0,
        options:
            categories.filter(cat => cat.type.name == "supplementary").map(cat => ({
                element: cat,
                name: cat.name,
                callback: (newCat: Category) => {
                    setColumnFilters(([...columnFilters.filter(item => item.id != 'id'), {
                        id: "id",
                        value: newCat.modules.map(m => m.moduleID)
                    }]))
                }
            })),

    };
    const turnusPickerOptions: DropdownProps<Turnus> = {
        title: "Turnus",
        options:
            turnusPossibilities.map(pos => ({
                element: pos,
                name: pos.name,
                callback: (newName: Turnus) => setColumnFilters(([...columnFilters.filter(item => item.id != "turnus"), { id: "turnus", value: newName }]))

            })),
        defaultIndex: 0,


    }
    const  getModulesOfCategoryType = (type: CategoryType) => {
        const catOfType = type.categories.map(c => c.categoryID);
        console.log(catOfType)
        console.log(modules)
        return modules.filter(m => m.categories.find(c => catOfType.includes(c.categoryID))).map(m => m.moduleID);

    };


    const categoryPickerOptions: DropdownProps<CategoryType> = {
        title: "Category",
        options:
            categoryTypes.concat([{ name: "All categories", typeID: 0, categories: [...categories] }]).map(type => ({
                element: type,
                name: type.name,
                callback: (newCatType: CategoryType) => {
                    setCurrentCategoryType(newCatType);
                    setColumnFilters(([...columnFilters.filter(item => item.id != 'id'), {
                        id: "id",
                        value: getModulesOfCategoryType(newCatType)
                    }]))

                }
            })),
        defaultIndex: 0,

    }

    const table = useReactTable({
        data: modules,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {},
        state: {
            columnFilters,
            columnVisibility: {
                indepthmodule: false,
                id: false,
                actions: user.isLoggedIn

            }

        }

    }


    );
    const showInDepthPicker = currentCategoryType.name == "inDepth"
    const showSupplementaryPicker = currentCategoryType.name == "supplementary"

    function getRowColor(index: number, moduleID: number) {
        if (pickedModules && pickedModules.find(pm => pm.module.moduleID == moduleID)) {
            return "bg-green-400"
        }
        if (index % 2 == 0) {
            return "bg-gray-300"

        }
        return "bg-gray-200"

    }



    return <div className="p-5 bg-[#eeeeee] ">
        <button onClick={() => console.log(modules)}>Print</button>
        <div className="mb-10 text-3xl font-bold">Modules overview</div>
        <div className="flex mb-10 gap-6">
            <div className="flex-auto">
                <Dropdown {...categoryPickerOptions} ></Dropdown>
                {showInDepthPicker ? <Dropdown {...inDepthPickerOptions}></Dropdown> : null}
                {showSupplementaryPicker ? <Dropdown {...supplementaryPickerOptions}></Dropdown> : null}
            </div>
            <div className="flex-auto">
                <Dropdown {...turnusPickerOptions}></Dropdown>

            </div>
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
                            <td className={`${getRowColor(index, row.getValue("id"))} pl-2 border-l border-gray-500`} key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
}
