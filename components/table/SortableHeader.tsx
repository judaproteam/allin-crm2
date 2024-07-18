import { Column } from "@tanstack/react-table"
import Icon from "../Icon"
import { useEffect } from "react"

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function SortableHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={className}>{title}</div>
  }

  useEffect(() => {
    if (title === "תאריך שליחת הצעה") {
      column.toggleSorting(true)
    }
  }, [])

  return (
    <button
      className="flex gap-2.5 flex-nowrap"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {title}

      {column.getIsSorted() === "desc" && (
        <Icon type="reg" name="arrow-up-wide-short" className="size-4 bg-slate-600" />
      )}
      {column.getIsSorted() === "asc" && (
        <Icon type="reg" name="arrow-down-short-wide" className="size-4 bg-slate-600" />
      )}
    </button>
  )
}
