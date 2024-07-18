import { Table } from "@tanstack/react-table"

import Icon from "@/components/Icon"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 mt-4">
      <div className="flex">
        <div className="flex text-sm font-medium">
          דף {table.getState().pagination.pageIndex + 1} מתוך {table.getPageCount()}
        </div>
        <div className="flex gap-3">
          <button
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to first page</span>

            <Icon name="angles-left" className="size-4" />
          </button>
          <button
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            <span className="sr-only">Go to previous page</span>

            <Icon name="angle-left" className="size-4" />
          </button>
          <button
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to next page</span>

            <Icon name="angle-right" className="size-4" />
          </button>
          <button
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            <span className="sr-only">Go to last page</span>

            <Icon name="angles-right" className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex gap-3">
        <p className="text-sm font-medium">שורות בדף</p>
        <select
          name=""
          className="h-8 w-[70px] text-center pe-4 text-s font-medium"
          id=""
          value={`${table.getState().pagination.pageSize}`}
          onChange={(e) => table.setPageSize(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
          <option value="60">60</option>
          <option value="70">70</option>
          <option value="80">80</option>
          <option value="90">90</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  )
}
