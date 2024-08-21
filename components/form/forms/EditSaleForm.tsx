'use client'

import Icon from 'jude_ui/icon'
import { Input, Select } from 'jude_ui/form'

import { getFormData } from 'jude_ui/form/funcs'
import { companyList, statusList } from '@/db/lists'
import { store, useSnap } from '@/utils/store'
import { Btn } from 'jude_ui/btns'
import { updateSale } from '@/db/sale/updateSale'
import { showPop } from 'jude_ui/pop'

export default function EditSaleForm() {
  const snap = useSnap().editSale

  async function onSubmit(e) {
    const data = getFormData(e)

    showPop({ msg: 'מעדכן מכירה...', icon: 'loading' })
    await updateSale({ updatedData: data, sale: snap })
    showPop({ msg: 'מכירה עודכנה', icon: 'success' })
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
              name="pay"
              type="number"
              value={snap.pay.toString()}
              onChange={(e) => (store.editSale.pay = Number(e.target.value))}
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
