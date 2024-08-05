import { toCurrency } from '@/utils/func'

export default function AgntRow({ item, headers }: TableRowProps) {
  function getCell(key: string) {
    if (key === 'name') return item[key]
    return toCurrency(item[key] | 0)
  }

  return (
    <tr>
      <td>
        <input type="checkbox" name="" id="" />
      </td>
      {headers.map((header) => (
        <td key={header.key} className="text-nowrap">
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
