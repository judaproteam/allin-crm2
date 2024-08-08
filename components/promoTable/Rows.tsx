import { toCurrency } from '@/utils/func'

export default function Rows({ item, headers }: TableRowProps) {
  function getCell(key: string) {
    if (key === 'name') return item[key]
    if (key === 'goal') return item[key] ? Math.round(item[key]) + '%' : '0%'
    return toCurrency(item[key] | 0)
  }

  function getGoalColor() {
    if (item.goal < 19 || !item.goal) return 'bg-red-50'

    if (item.goal < 79) return 'bg-white'
    if (item.goal < 99) return 'bg-yellow-50'

    return 'bg-green-200'
  }

  return (
    <tr className={getGoalColor()}>
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
