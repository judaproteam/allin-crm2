"use client"

import { ColumnDef } from "@tanstack/react-table"
import Icon from "@/components/Icon"
import { SortableHeader } from "@/components/table/SortableHeader"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import type { Sale } from "@prisma/client"

export const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: "offrDt",
    header: ({ column }) => <SortableHeader column={column} title="תאריך שליחת הצעה" />,
    cell: ({ row }) => {
      const dt = row.getValue("offrDt") as Date
      const formatted = new Intl.DateTimeFormat("he-IL").format(dt)

      return <div className="text-start">{formatted}</div>
    },
    meta: { type: "date", title: "תאריך שליחת הצעה" },
  },
  {
    accessorKey: "client.firstName",
    header: ({ column }) => <SortableHeader column={column} title="שם פרטי" />,
    meta: { type: "string", title: "שם פרטי" },
  },
  {
    accessorKey: "client.lastName",
    header: ({ column }) => <SortableHeader column={column} title="שם משפחה" />,
    meta: { type: "string", title: "שם משפחה" },
  },
  {
    accessorKey: "client.idNum",
    header: ({ column }) => <SortableHeader column={column} title="ת.ז." />,
    meta: { type: "string", title: "ת.ז." },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="סטטוס" />,
    meta: { type: "string", title: "סטטוס" },
  },
  {
    accessorKey: "action",
    header: ({ column }) => <SortableHeader column={column} title="פעולה" />,
    meta: { type: "string", title: "פעולה" },
  },
  {
    accessorKey: "company",
    header: ({ column }) => <SortableHeader column={column} title="חברה" />,
    meta: { type: "string", title: "חברה" },
  },
  {
    accessorKey: "branch",
    header: ({ column }) => <SortableHeader column={column} title="ענף" />,
    meta: { type: "string", title: "ענף" },
  },
  {
    accessorKey: "prdct",
    header: ({ column }) => <SortableHeader column={column} title="מוצר" />,
    meta: { type: "string", title: "מוצר" },
  },
  {
    accessorKey: "saleDt",
    header: ({ column }) => <SortableHeader column={column} title="תאריך הפקה" />,
    meta: { type: "date", title: "תאריך הפקה" },
    cell: ({ row }) => {
      const dt = row.getValue("saleDt") as Date
      const formatted = new Intl.DateTimeFormat("he-IL").format(dt)

      return <div className="text-start">{formatted}</div>
    },
  },
  {
    accessorKey: "agnt.firstName",
    header: ({ column }) => <SortableHeader column={column} title="סוכן" />,
    meta: { type: "string", title: "סוכן" },
  },
  {
    accessorKey: "prdctType",
    header: ({ column }) => <SortableHeader column={column} title="סוג המוצר" />,
    meta: { type: "string", title: "סוג המוצר" },
  },

  {
    accessorKey: "pay",
    header: ({ column }) => <SortableHeader column={column} title="סכום" />,
    meta: { type: "number", title: "סכום" },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("pay"))
      const formatted = new Intl.NumberFormat("he-IL", {
        style: "currency",
        currency: "ILS",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)

      return <div className="text-start">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const sale = row.original

      return (
        <Popover>
          <PopoverTrigger asChild>
            <button className="">
              <span className="sr-only">Open menu</span>
              <Icon
                name="ellipsis-vertical"
                type="reg"
                className="size-3.5 bg-slate-600 hover:bg-slate-900"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto" align="end">
            <div className="grid gap-2 px-3 text-sm">
              <button
                className="white-btn"
                onClick={() => navigator.clipboard.writeText(sale["client"]["firstName"])}>
                <Icon name="copy" type="reg" className="size-4" />
                <p>Copy sale ID</p>
              </button>
              <button className="white-btn">View customer</button>
              <button className="white-btn">View sale details</button>
            </div>
          </PopoverContent>
        </Popover>
      )
    },
  },
]
