import Icon from '@/ui/Icon'
import { toCurrency, toDate } from '@/utils/func'
import { store } from '@/utils/store'
import { SaleTableData } from '@/utils/types'

export default function TableRow({ item, headers }: TableRowProps) {
  function getCell(key: string) {
    if (key === 'pay') return toCurrency(item.pay)
    if (key === 'offrDt') return toDate(item.offrDt)

    return item[key]
  }

  function onItem(item) {
    store.editSale = {
      company: item.company,
      branch: item.branch,
      prdct: item.prdct,
      prdctType: item.prdctType,
      status: item.status,
      pay: item.pay,
    }
  }

  return (
    <tr>
      <td>
        <input type="checkbox" name="checkSale" id={item.id.toString()} />
      </td>
      {headers.map((header) => (
        <td key={header.key} onClick={() => console.log(item)}>
          {getCell(header.key)}
        </td>
      ))}

      <td className="flex gap-2 flex-nowrap justify-center">
        <button
          type="button"
          className="simple-btn border-slate-100 size-8 p-0 justify-center hover:bg-blue-50"
          title="עריכה"
          onClick={() => onItem(item)}
          popoverTarget="popEditSaleForm">
          <Icon name="pencil" className="size-4 rtl:scale-x-100" />
        </button>
        <button
          type="button"
          className="simple-btn border-slate-100 size-8 p-0 justify-center hover:bg-red-50"
          title="מחיקה"
          onClick={() => {
            store.deleteId = item.id
            document.getElementById('delPop').showPopover()
          }}>
          <Icon name="trash" className="size-4" />
        </button>
      </td>
    </tr>
  )
}

type TableRowProps = {
  item: SaleTableData
  headers: Array<{ key: string; label: string }>
}
