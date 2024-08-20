import { addStickySale, deleteStickySale, checkStickySale } from '@/db/sale/stickySales'
import Icon from 'jude_ui/icon'
import { toCurrency, toDate } from '@/utils/func'
import { store } from '@/utils/store'
import { SaleTableData } from '@/utils/types'
import { useUser } from '@/utils/userCtx'

export default function TableRow({ item, headers, iconType }: TableRowProps) {
  const { user } = useUser()

  function getCell(key: string) {
    if (key === 'pay') return toCurrency(item.pay)
    if (key === 'offrDt') return toDate(item.offrDt)

    return item[key]
  }

  async function onSticky(item) {
    await checkStickySale(item.id, user.id)
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

      <td>
        <button onClick={() => onSticky(item)}>
          <Icon name="thumbtack" className="size-4" type={iconType} />
        </button>
      </td>
      {headers.map((header) => (
        <td key={header.key} onClick={() => console.log(item)}>
          {getCell(header.key)}
        </td>
      ))}

      <td className="grid grid-cols-2 gap-2">
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
  iconType: 'lit' | 'sol'
  item: SaleTableData
  headers: Array<{ key: string; label: string }>
}
