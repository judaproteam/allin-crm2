import SaleForm from '@/components/form/forms/SaleForm'
import { getAllAgnts } from '@/db/agnt'

export default async function Home() {
  const agnts = await getAllAgnts()

  return (
    <div>
      <SaleForm agnts={agnts} />
    </div>
  )
}
