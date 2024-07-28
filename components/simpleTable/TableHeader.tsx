import { clone } from '@/utils/func'
import { Dispatch, SetStateAction } from 'react'
import Icon from '../Icon'
import { useRouter, useSearchParams } from 'next/navigation'

interface TableHeaderProps {
  headers: Array<{ key: string; label: string }>
  setColumnOrder: Dispatch<SetStateAction<{ key: string; label: string }[]>>
}

let dragIndex: number, enterIndex: number

export default function TableHeader(props: TableHeaderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { headers, setColumnOrder } = props

  const onDragEnd = () => {
    let tmpHeaders = clone(headers)
    const _dragItem = tmpHeaders.splice(dragIndex, 1)[0]
    tmpHeaders.splice(enterIndex, 0, _dragItem)

    localStorage.setItem('columnOrder', JSON.stringify(tmpHeaders))

    setColumnOrder(tmpHeaders)
  }

  function onSort(key: string) {
    const qParams = Object.fromEntries(new URLSearchParams(searchParams))
    if (qParams.orderBy === key) {
      qParams.direction = qParams.direction === 'asc' ? 'desc' : 'asc'
    } else {
      qParams.orderBy = key
      qParams.direction = 'asc'
    }

    const url = new URLSearchParams(qParams).toString()
    router.replace('?' + url, { scroll: false })
  }

  return (
    <tr className="tblHead">
      <th>
        <input type="checkbox" name="" id="" />
      </th>
      {headers.map((header, i) => {
        const isClientOrAgnt = header.key === 'agntName' || header.key === 'clientData'
        return (
          <th
            key={header.key}
            draggable
            onDragStart={() => (dragIndex = i)}
            onDragEnter={() => (enterIndex = i)}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => {
              !isClientOrAgnt && onSort(header.key)
            }}
            className={isClientOrAgnt ? '' : 'cursor-move'}>
            <span className="flex gap-2">
              {header.label}
              {searchParams.get('orderBy') === header.key && (
                <Icon
                  type="reg"
                  name={
                    searchParams.get('direction') === 'asc'
                      ? 'arrow-down-short-wide'
                      : 'arrow-up-wide-short'
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
