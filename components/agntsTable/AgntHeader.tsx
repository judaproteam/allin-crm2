import { clone } from '@/utils/func'
import { Dispatch, SetStateAction } from 'react'
import Icon from '../../ui/Icon'

let dragIndex: number, enterIndex: number

export default function AgntHeader({
  headers,
  setColumnOrder,
  onSort,
  sortConfig,
}: TableHeaderProps) {
  const onDragEnd = () => {
    let tmpHeaders = clone(headers)
    const _dragItem = tmpHeaders.splice(dragIndex, 1)[0]
    tmpHeaders.splice(enterIndex, 0, _dragItem)
    localStorage.setItem('agntColumnOrder', JSON.stringify(tmpHeaders))
    setColumnOrder(tmpHeaders)
  }

  return (
    <tr className="tblHead">
      <th>
        <input type="checkbox" name="" id="" />
      </th>
      {headers.map((header, i) => {
        return (
          <th
            key={header.key}
            draggable
            onDragStart={() => (dragIndex = i)}
            onDragEnter={() => (enterIndex = i)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => onSort(header.key)}
            className="cursor-move">
            <span className="flex gap-2">
              {header.label}
              {sortConfig.key === header.key && (
                <Icon
                  type="reg"
                  name={
                    sortConfig.direction === 'asc' ? 'arrow-down-short-wide' : 'arrow-up-wide-short'
                  }
                  className="size-3.5 bg-slate-700"
                />
              )}
            </span>
          </th>
        )
      })}
    </tr>
  )
}

interface TableHeaderProps {
  headers: Array<{ key: string; label: string }>
  setColumnOrder: Dispatch<SetStateAction<{ key: string; label: string }[]>>
  onSort: (key: string) => void
  sortConfig: { key: string | null; direction: 'asc' | 'desc' }
}
