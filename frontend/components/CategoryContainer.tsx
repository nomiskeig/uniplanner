import { Category, Module } from "@/app/types"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"

export interface CategoryContainerProps {
    name: string
    modules: Module[]
    category: Category

}


const columnHelper = createColumnHelper<Module>()
const columns = [
    columnHelper.accessor('name', {
        cell: info => info.getValue(),

    })
]
export function CategoryContainer(props: CategoryContainerProps) {
    const currentECTS: number = props.modules.reduce((acc, curr) => acc += +curr.ects, 0)
    const table = useReactTable({
        data: props.modules,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return <div>

        <div>{props.name}: {props.category.name}</div>
        <div>{currentECTS} of {props.category.minECTS}-{props.category.maxECTS}</div>
        <div>
            <table>
                <thead>{table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => <th key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </th>)}
                    </tr>
                ))}</thead>
            </table>
        </div>
    </div>
}
