import { toCurrency, toDate } from '@/utils/func'

export default function TableRow({ item, headers }: TableRowProps) {
  function getCell(key: string) {
    if (key === 'pay') return toCurrency(item.pay)
    if (key === 'offrDt') return toDate(item.offrDt)

    return item[key]
  }

  return (
    <tr>
      <td>
        <input type="checkbox" name="" id="" />
      </td>
      {headers.map((header) => (
        <td key={header.key} onClick={() => console.log(item)}>
          {getCell(header.key)}
        </td>
      ))}
    </tr>
  )
}

interface TableRowProps {
  item: Record<string, any>
  headers: Array<{ key: string; label: string }>
}
