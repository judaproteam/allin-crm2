import React from 'react'
import Table from '@/components/simpleTable/Table'
import { headers } from '@/components/simpleTable/saleHeaders'
import { getSales } from '@/db/sales'

export default async function SimpleTablePage() {
  const data = await getSales()

  console.log('data: ', data)

  return (
    <div>
      <h1>React Table Example</h1>
      <Table headers={headers} data={data} />
    </div>
  )
}

// const data = [
//   {
//     offrDt: '2023-01-01',
//     client: { firstName: 'John', lastName: 'Doe', idNum: '123456789' },
//     status: 'Pending',
//     action: 'Review',
//     company: 'ABC Corp',
//     branch: 'Finance',
//     prdct: 'Insurance',
//     saleDt: '2023-01-01',
//     agnt: { firstName: 'Alice' },
//     prdctType: 'Life Insurance',
//     pay: '2000',
//   },
//   {
//     offrDt: '2023-01-01',
//     client: { firstName: 'Jane', lastName: 'Smith', idNum: '987654321' },
//     status: 'Approved',
//     action: 'Process',
//     company: 'XYZ Ltd',
//     branch: 'Tech',
//     prdct: 'Software',
//     saleDt: '2023-01-01',
//     agnt: { firstName: 'Bob' },
//     prdctType: 'Subscription',
//     pay: '1500',
//   },
//   {
//     offrDt: '2023-01-01',
//     client: { firstName: 'Michael', lastName: 'Johnson', idNum: '555555555' },
//     status: 'Declined',
//     action: 'Archive',
//     company: 'DEF Inc',
//     branch: 'Healthcare',
//     prdct: 'Medical Equipment',
//     saleDt: '2023-01-01',
//     agnt: { firstName: 'Charlie' },
//     prdctType: 'One-time Purchase',
//     pay: '5000',
//   },
// ]
