'use client'

import Icon from '@/components/Icon'
import { useState } from 'react'
import TextInput from '../TextInput'
import SelectInput from '../SelectInput'
import { branchList, companyList, getPrdctByBranch, pensionyList, statusList } from '@/db/lists'
import Collab from '../Collab'
import { agntObj, saleObj } from '@/utils/types'
import { insertSale } from '@/db/sale/insertSales'
import PopMsg from '@/components/PopMsg'
import DatePicker from '../DatePicker'

export default function SaleForm({ agnts }) {
  const [prdcts, setPrdcts] = useState([{}])
  const [share, setShare] = useState(false)

  async function onSave(e: React.SyntheticEvent) {
    e.preventDefault()

    const sale = { details: {}, prdcts: [] } as unknown as saleObj
    for (let i = 0; i < document.forms.length; i++) {
      const form = document.forms[i]
      if (!form.checkValidity()) return form.reportValidity()
      document.getElementById('loadingMsg').showPopover()

      const obj = new FormData(form)
      const data = Object.fromEntries(obj)

      if (i === 0) {
        sale.details = data as saleObj['details']
      } else {
        sale.prdcts.push(data as saleObj['prdcts'][0])
        const prdctTypeList = ['ניוד', 'הפקדה חודשית', 'הפקדה חד פעמית']
        if (!data.pay) {
          let err = true
          for (const key of prdctTypeList) {
            if (data[key]) err = false
          }
          if (err) return document.getElementById('errMsg').showPopover()
        }
      }
      console.log('fromEntries : ', i + ' ', data)
      console.log('sale: ', sale)
    }

    const res = await insertSale(sale)
    if (res.err) {
      document.getElementById('dbErr').showPopover()
      return
    }
    document.getElementById('checkMsg').showPopover()
    console.log('res: ', res)
  }

  return (
    <div popover="auto" id="popSaleForm" className="pop overflow-y-auto h-5/6 p-8 rounded-md">
      <main className="max-w-4xl mx-auto">
        <form id="saleForm">
          <div className="flex items-end justify-between border-b pb-3">
            <h2 className="flex gap-4">
              <Icon name="money-check-dollar-pen" type="lit" className="size-7 rtl:scale-x-100" />
              <span className="text-xl font-semibold">יצירת מכירה חדשה</span>
            </h2>
          </div>

          <section className="my-6 flex gap-8 items-end">
            {!share && (
              <>
                <label className="slct">
                  <p>שם הסוכן</p>
                  <select name="agntId">
                    {agnts.map((agnt: agntObj) => (
                      <option value={agnt.id} key={agnt.id}>
                        {agnt.firstName + ' ' + agnt.lastName}
                      </option>
                    ))}
                  </select>
                </label>

                <button className="btn-soft-s" type="button" onClick={() => setShare(true)}>
                  <Icon name="plus" type="reg" />
                  <p>שת"פ</p>
                </button>
              </>
            )}
            {share && (
              <>
                <Collab agnts={agnts} />
                <button className="btn-soft-s" type="button" onClick={() => setShare(false)}>
                  <Icon name="trash" type="reg" />
                  <p>בטל שת"פ</p>
                </button>
              </>
            )}
          </section>

          <section className="grid gap-6">
            <section className="flex gap-8 items-end">
              <SelectInput lbl="פעולה" field="action" list={['מכירה', 'מינוי סוכן']} />
              {/* <TextInput type="date" lbl="תאריך שליחת הצעה" field="offrDt" /> */}

              <DatePicker lbl="תאריך שליחת הצעה" field="offrDt" />
            </section>

            <section className="flex gap-8">
              <TextInput lbl="שם פרטי" field="clientFirstName" />
              <TextInput lbl="שם משפחה" field="clientLastName" />
              <TextInput lbl="תעודת זהות" field="idNum" type="number" errMsg="ת.ז. אינה תקין" />
            </section>
          </section>
        </form>

        {/* PRODUCT */}
        <div>
          {prdcts.map((p, i) => {
            return <PrdctComp i={i} key={i} />
          })}
          <div className="flex justify-between items-start">
            <button className="btn-soft-s" type="button" onClick={() => setPrdcts([...prdcts, {}])}>
              <Icon name="plus" type="reg" />
              <p>הוספת מוצר</p>
            </button>
            <button className="btn mt-8" onClick={onSave}>
              <Icon name="floppy-disk" type="sol" className="bg-white" />
              <p>שמור מכירה</p>
            </button>
          </div>
        </div>
        <PopMsg msg="שגיאה, מכירה לא נשמרה" icon="error" id="dbErr" />
        <PopMsg msg="לא הוכנס סכום לפחות למוצר אחד" icon="error" id="errMsg" />
        <PopMsg msg="שומר מכירה..." icon="loading" id="loadingMsg" />
        <PopMsg msg="מכירה נשמרה בהצלחה" icon="success" id="checkMsg" />
      </main>
    </div>
  )
}

function PrdctComp({ i }) {
  const [prdct, setPrdct] = useState({
    prdctList: pensionyList,
    prdctTypeList: ['ניוד', 'הפקדה חודשית'],
  })

  return (
    <form className="my-8">
      <h2 className="text-lg border-b pb-2 mb-4">מוצר {i + 1}</h2>
      <section className="flex gap-8 grid-cols-3 ">
        <SelectInput lbl="חברה" field="company" list={companyList} />

        <SelectInput
          lbl="ענף"
          field="branch"
          list={branchList}
          onSelect={(e) => {
            setPrdct(getPrdctByBranch(e.target.value))
          }}
        />
        <SelectInput lbl="מוצר" field="prdct" list={prdct.prdctList} />
        {prdct.prdctTypeList.length < 2 && (
          <SelectInput lbl="סוג המוצר" field="prdctType" list={prdct.prdctTypeList} />
        )}
        {prdct.prdctTypeList.length > 1 &&
          prdct.prdctTypeList.map((prdctType, i) => (
            <TextInput
              key={i}
              lbl={'סכום ' + prdctType}
              field={prdctType}
              type="number"
              required={false}
              errMsg="סכום אינו תקין"
            />
          ))}
        {prdct.prdctTypeList.length < 2 && (
          <TextInput lbl="סכום" field="pay" type="number" errMsg="סכום אינו תקין" />
        )}
        <SelectInput lbl="סטטוס" field="status" list={statusList} />
      </section>
    </form>
  )
}
