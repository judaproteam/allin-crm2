'use client'

import AgntTable from '@/components/agntsTable/AgntTable'
import { useState } from 'react'

export default function Promotion({ agtnsSum }) {
  const [tblData, setTblData] = useState(agtnsSum)

  return (
    <main>
      <AgntTable tblData={tblData} setTableData={setTblData} />
    </main>
  )
}
