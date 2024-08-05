import AgntTable from '@/components/agntsTable/AgntTable'
import { getAgntsTotal } from '@/db/agnt/getTotal'
import Upload from '@/ui/uploadImg/Upload'

export default async function PromotionPage() {
  const agntsTotal = await getAgntsTotal()

  return (
    <main>
      <Upload />
      <AgntTable agntsTotal={agntsTotal} />
    </main>
  )
}
