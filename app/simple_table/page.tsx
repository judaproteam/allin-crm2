import React from 'react'
import Table from '@/components/simpleTable/Table'
import { headers } from '@/components/simpleTable/saleHeaders'
import { getSales } from '@/db/sale/getAales'

export default async function SimpleTablePage() {
  const data = await getSales()

  console.log('data: ', data)

  return (
    <div>
      <Table headers={headers} data={data} />
    </div>
  )
}
