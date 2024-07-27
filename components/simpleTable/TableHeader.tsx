import { clone } from '@/utils/func'
import { Dispatch, SetStateAction } from 'react'
import Icon from '../Icon'

interface TableHeaderProps {
  headers: Array<{ key: string; label: string }>
  onSort: (key: string) => void
  setColumnOrder: Dispatch<SetStateAction<{ key: string; label: string }[]>>
  sortConfig: { key: string | null; direction: 'asc' | 'desc' }
}

let dragIndex: number, enterIndex: number

export default function TableHeader(props: TableHeaderProps) {
  const { headers, onSort, sortConfig, setColumnOrder } = props

  const onDragEnd = () => {
    let tmpHeaders = clone(headers)
    const _dragItem = tmpHeaders.splice(dragIndex, 1)[0]
    tmpHeaders.splice(enterIndex, 0, _dragItem)

    setColumnOrder(tmpHeaders)
  }

  return (
    <tr className="tblHead">
      <th>
        <input type="checkbox" name="" id="" />
      </th>
      {headers.map((header, i) => (
        <th
          key={header.key}
          draggable
          onDragStart={() => (dragIndex = i)}
          onDragEnter={() => (enterIndex = i)}
          onDragEnd={onDragEnd}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => onSort(header.key)}>
          <span className="flex gap-2">
            {header.label}
            {sortConfig.key === header.key && (
              <Icon
                type="reg"
                name={
                  sortConfig.direction === 'asc' ? 'arrow-down-short-wide' : 'arrow-up-wide-short'
                }
                className="size-4 bg-slate-600"
              />
            )}
          </span>
        </th>
      ))}
    </tr>
  )
}
