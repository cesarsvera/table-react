import React, { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import {
    Column,
    ColumnDef,
    ColumnOrderState,
    flexRender,
    getCoreRowModel,
    Header,
    // Table,
    useReactTable,
} from 'react-table'

const defaultColumns = [
    {
        accessorKey: 'firstName',
        id: 'firstName',
        header: 'First Name',
        cell: info => info.getValue(),
        footer: props => props.column.id,
    },
    {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
    },
    {
        accessorKey: 'age',
        id: 'age',
        header: 'Age',
        footer: props => props.column.id,
    },

    {
        accessorKey: 'visits',
        id: 'visits',
        header: 'Visits',
        footer: props => props.column.id,
    },
    {
        accessorKey: 'status',
        id: 'status',
        header: 'Status',
        footer: props => props.column.id,
    },
    {
        accessorKey: 'progress',
        id: 'progress',
        header: 'Profile Progress',
        footer: props => props.column.id,
    },
]


const reorderColumn = (
    draggedColumnId,
    targetColumnId,
    columnOrder
) => {
    String(columnOrder.splice(columnOrder.indexOf(targetColumnId), 0, columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]))
    return [...columnOrder]
}


const DraggableColumnHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header

    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn) => {
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            )
            setColumnOrder(newColumnOrder)
        },
    })

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: 'column',
    })

    return (
        <th
            ref={dropRef}
            colSpan={header.colSpan}
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div ref={previewRef}>
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                <button ref={dragRef}>🟰</button>
            </div>
        </th>
    )
}


export const TableReact = () => {

    const [data, setData] = useState()

    const [columns, setColumns] = useState(() => [...defaultColumns])
    const [columnOrder, setColumnOrder] = useState(columns.map(column => String(column.id)))


    const regenerateData = () => setData(() => makeData(20))

    const resetOrder = () =>
        setColumnOrder(columns.map(column => String(column.id) ))

    const table = useReactTable({
        data,
        columns,
        state: {
            columnOrder,
        },
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    return (
        <div className="p-2">
            <div className="h-4" />
            <div className="flex flex-wrap gap-2">
                <button onClick={() => regenerateData()} className="border p-1">
                    Regenerate
                </button>
                <button onClick={() => resetOrder()} className="border p-1">
                    Reset Order
                </button>
            </div>
            <div className="h-4" />
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <DraggableColumnHeader
                                    key={header.id}
                                    header={header}
                                    table={table}
                                />
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
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
            <pre>{JSON.stringify(table.getState().columnOrder, null, 2)}</pre>
        </div>
    )


}
