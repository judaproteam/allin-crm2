import { toCurrency, toDate } from '@/utils/func'

interface TableRowProps {
  item: Record<string, any>
  headers: Array<{ key: string; label: string }>
}

export default function TableRow(props: TableRowProps) {
  const { item, headers } = props

  function getCell(key: string) {
    if (key === 'pay') return toCurrency(item.pay)
    if (key === 'offrDt') return toDate(item.offrDt)

    return item[key]
  }

  return (
    <tr>
      {headers.map((header) => (
        <td className="tblRow" key={header.key} onClick={() => console.log(item)}>
          {
            getCell(header.key)
            //header.key === 'pay' ? toCurrency(item.pay) : item[header.key]
          }
        </td>
      ))}
    </tr>
  )
}
