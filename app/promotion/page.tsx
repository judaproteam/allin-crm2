import AgntTable from '@/components/agntsTable/AgntTable'
import PromoForm from '@/components/form/forms/PromoForm'
import { getAgntsTotal } from '@/db/agnt/getTotal'
import Upload from '@/ui/uploadImg/Upload'

export default async function PromotionPage() {
  const agntsTotal = await getAgntsTotal()

  return (
    <main>
      <Upload />
      <PromoForm />
      <AgntTable agntsTotal={agntsTotal} />
    </main>
  )
}
