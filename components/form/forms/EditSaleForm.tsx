'use client'

import Icon from '@/ui/Icon'
import Input from '@/ui/forms/Input'
import Select from '@/ui/forms/Select'
import { branchList, companyList, getPrdctByBranch, pensionyList, statusList } from '@/db/lists'
import { EditSale, saleObj } from '@/utils/types'
import { insertSale } from '@/db/sale/insertSales'
import PopMsg from '@/components/PopMsg'
import { checkPayExist } from '@/utils/func'
import { useSnap } from '@/utils/store'

export default function EditSaleForm() {
  const snap = useSnap()

  async function onSave(e: React.SyntheticEvent) {
    e.preventDefault()

    const prdctForms = document.querySelectorAll(
      "[name='prdctForm']"
    ) as NodeListOf<HTMLFormElement>

    const sale = { details: {}, prdcts: [] } as unknown as saleObj

    for (let i = 0; i < prdctForms.length; i++) {
      const form = prdctForms[i]
      if (!form.checkValidity()) return form.reportValidity()
      const data = Object.fromEntries(new FormData(form))

      if (checkPayExist(data)) return document.getElementById('errMsg').showPopover()
      sale.prdcts.push(data as saleObj['prdcts'][0])
    }

    document.getElementById('loadingMsg').showPopover()
    const res = await insertSale(sale)
    if (res.err) {
      console.log('res.err: ', res.err)
      return document.getElementById('dbErr').showPopover()
    }
    document.getElementById('checkMsg').showPopover()

    console.log('res: ', res)
  }

  return (
    <div popover="auto" id="popEditSaleForm" className="pop overflow-y-auto p-8 rounded-md">
      <main className="max-w-4xl mx-auto">
        <h2 className="flex gap-4 border-b pb-3">
          <Icon name="money-check-dollar-pen" type="lit" className="size-7 rtl:scale-x-100" />
          <span className="text-xl font-semibold">עריכת מכירה</span>
        </h2>

        {/* PRODUCT */}
        <div>
          <PrdctComp editSale={snap.editSale} />

          <button className="btn mt-2" onClick={onSave} type="button">
            <Icon name="floppy-disk" type="sol" className="bg-white" />
            <p>שמור מכירה</p>
          </button>
        </div>
        <PopMsg msg="שגיאה, מכירה לא נשמרה" icon="error" id="dbErr" />
        <PopMsg msg="לא הוכנס סכום לפחות למוצר אחד" icon="error" id="errMsg" />
        <PopMsg msg="שומר מכירה..." icon="loading" id="loadingMsg" />
        <PopMsg msg="מכירה נשמרה בהצלחה" icon="success" id="checkMsg" />
      </main>
    </div>
  )
}

function PrdctComp({ editSale }: { editSale: EditSale }) {
  return (
    <form name="editPrdctForm" className="my-4">
      <div className="flex mb-2">
        <p>{editSale.branch}</p>
        <p>{editSale.prdct}</p>
        <p>{editSale.prdctType}</p>
      </div>
      <section className="grid gap-8 grid-cols-2">
        <Select lbl="חברה" field="company" list={companyList} defaultValue={editSale.company} />

        <Input
          lbl="סכום"
          field={editSale.prdctType}
          type="number"
          required
          errMsg="סכום אינו תקין"
          defaultValue={editSale.pay.toString()}
        />

        <Select lbl="סטטוס" field="status" list={statusList} defaultValue={editSale.status} />
      </section>
    </form>
  )
}
