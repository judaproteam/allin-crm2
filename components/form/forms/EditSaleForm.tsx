'use client'

import Icon from 'jude_ui/icon'
import { Input, Select } from 'jude_ui/form'

import { getFormData } from 'jude_ui/form/funcs'
import { companyList, statusList } from '@/db/lists'
import { store, useSnap } from '@/utils/store'
import { Btn } from 'jude_ui/btns'
import { updateSale } from '@/db/sale/update'
// import Select from '@/ui/forms/Select'

export default function EditSaleForm() {
  const snap = useSnap().editSale

  async function onSubmit(e) {
    const data = getFormData(e)

    console.log('data: ', data)

    // await updateSale(snap.id, data)
  }

  return (
    <div popover="auto" id="popEditSaleForm" className="pop overflow-y-auto p-8 rounded-md">
      <main className="max-w-4xl mx-auto">
        <h2 className="flex gap-4 border-b pb-3">
          <Icon name="money-check-dollar-pen" type="lit" className="size-7 rtl:scale-x-100" />
          <span className="text-xl font-semibold">עריכת מכירה</span>
        </h2>

        {/* PRODUCT */}

        <form name="editPrdctForm" className="my-4" onSubmit={onSubmit}>
          <div className="flex gap-2 mb-8">
            <p className="bg-gray-100 py-2 px-4 rounded-md">{snap.branch}</p>
            <p className="bg-gray-100 py-2 px-4 rounded-md">{snap.prdct}</p>
            <p className="bg-gray-100 py-2 px-4  rounded-md">{snap.prdctType}</p>
          </div>
          <section className="grid gap-4 grid-cols-2 items-end">
            <Select
              lbl="חברה"
              name="company"
              list={companyList}
              value={snap.company}
              onChange={(e) => (store.editSale.company = e.target.value)}
            />

            <Input
              lbl="סכום"
              name={snap.prdctType}
              type="number"
              defaultValue={snap.pay.toString()}
            />

            <Select
              lbl="סטטוס"
              name="status"
              list={statusList}
              value={snap.status}
              onChange={(e) => (store.editSale.status = e.target.value)}
            />
          </section>
          <Btn className="w-full mt-8" lbl="שמור עריכה" clr="solid" icon="floppy-disk" />
        </form>
      </main>
    </div>
  )
}

// async function onSubmit(e: React.SyntheticEvent) {
//   e.preventDefault()

//   const prdctForms = document.querySelectorAll(
//     "[name='prdctForm']"
//   ) as NodeListOf<HTMLFormElement>

//   const saveSale = { details: {}, prdcts: [] } as unknown as saleObj

//   for (let i = 0; i < prdctForms.length; i++) {
//     const form = prdctForms[i]
//     if (!form.checkValidity()) return form.reportValidity()
//     const data = Object.fromEntries(new FormData(form))

//     if (checkPayExist(data)) return document.getElementById('errMsg').showPopover()
//     saveSale.prdcts.push(data as saleObj['prdcts'][0])
//   }

//   document.getElementById('loadingMsg').showPopover()
//   const res = await insertSale(saveSale)
//   if (res.err) {
//     console.log('res.err: ', res.err)
//     return document.getElementById('dbErr').showPopover()
//   }
//   document.getElementById('checkMsg').showPopover()

//   console.log('res: ', res)
// }
