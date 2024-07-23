'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table'

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/table'
import { useState } from 'react'
import { DataTablePagination } from '@/components/table/DataTablePagination'
import { EyeCheckbox } from '@/components/eyeCheckbox'

import Icon from '@/components/Icon'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <div>
      <div className="flex justify-between py-4">
        <label className="input-icon">
          <Icon name="magnifying-glass" type="sol" className="size-4 rtl:scale-x-100" />
          <input
            placeholder="חיפוש..."
            type="text"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
        </label>
        {/* <input
          placeholder="Filter client name..."
          type="text"
          value={(table.getColumn("client_firstName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("client_firstName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> */}
        <Popover>
          <PopoverTrigger>
            <div className="flex bg-white h-9 gap-3 px-4 rounded-md">
              <Icon name="eye" type="lit" className="size-3.5" />
              <p className="text-sm">עמודות להצגה</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="grid gap-2 w-auto ps-4 pe-8 bg-white z-50 py-4 shadow-lg rounded-md">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const title = column.columnDef.meta?.title

                return (
                  title && (
                    <label className="flex gap-2 cursor-pointer" key={column.id}>
                      <EyeCheckbox
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      />
                      <span className="ms-2 text-sm">{title}</span>
                    </label>
                  )
                )
              })}
          </PopoverContent>
        </Popover>
      </div>
      <div className="tbl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
