"use client"

import Icon from "@/components/Icon"
import { useState } from "react"
import TextInput from "../TextInput"
import SelectInput from "../SelectInput"
import { branchList, companyList, getPrdctByBranch, pensionyList, statusList } from "@/utils/lists"
import Collab from "../Collab"
import { agntObj, saleObj } from "@/utils/types"
import { insertSale } from "@/utils/db_actions/insertSales"

export default function SaleFormComp({ agnts }) {
  const [prdcts, setPrdcts] = useState([{}])
  const [share, setShare] = useState(false)

  async function onSave(e: React.SyntheticEvent) {
    e.preventDefault()
    const sale = { details: {}, prdcts: [] } as unknown as saleObj
    for (let i = 0; i < document.forms.length; i++) {
      const form = document.forms[i]
      if (!form.checkValidity()) {
        form.reportValidity()
        return
      }

      const data = new FormData(form)
      if (i === 0) {
        sale.details = Object.fromEntries(data) as saleObj["details"]
      } else {
        sale.prdcts.push(Object.fromEntries(data) as saleObj["prdcts"][0])
      }
      console.log("fromEntries : ", i + " ", Object.fromEntries(data))
      console.log("sale: ", sale)
    }

    const res = await insertSale(sale)
    console.log("res: ", res)
  }

  return (
    <main className="paper max-w-4xl mx-auto">
      <form id="saleForm" onSubmit={onSave}>
        <div className="flex items-end justify-between border-b pb-3">
          <h2 className="flex gap-4">
            <Icon name="money-check-dollar-pen" type="lit" className="size-7 rtl:scale-x-100" />
            <span className="text-xl font-semibold">יצירת מכירה חדשה</span>
          </h2>

          <button className="btn-s" type="submit">
            <Icon name="floppy-disk" type="sol" className="bg-white" />
            <p>שמור מכירה</p>
          </button>
        </div>

        <section className="my-6 flex gap-8 items-end">
          {!share && (
            <>
              <label className="slct">
                שם הסוכן
                <select name="agntId">
                  {agnts.map((agnt: agntObj) => (
                    <option value={agnt.id} key={agnt.id}>
                      {agnt.firstName + " " + agnt.lastName}
                    </option>
                  ))}
                </select>
              </label>

              <button className="btn-soft-small" type="button" onClick={() => setShare(true)}>
                <Icon name="plus" type="reg" />
                <p>שת"פ</p>
              </button>
            </>
          )}
          {share && (
            <>
              <Collab agnts={agnts} />
              <button className="btn-soft-small" type="button" onClick={() => setShare(false)}>
                <Icon name="trash" type="reg" />
                <p>בטל שת"פ</p>
              </button>
            </>
          )}
        </section>

        <section className="grid gap-6">
          <TextInput type="date" lbl="תאריך שליחת הצעה" field="offrDt" />
          <section className="flex gap-8">
            <TextInput lbl="שם פרטי" field="clientFirstName" />
            <TextInput lbl="שם משפחה" field="clientLastName" />
            <TextInput lbl="תעודת זהות" field="idNum" type="number" />
          </section>
        </section>
      </form>

      {/* PRODUCT */}
      <div>
        {prdcts.map((p, i) => {
          return <PrdctComp i={i} key={i} />
        })}
        <button className="btn-soft" type="button" onClick={() => setPrdcts([...prdcts, {}])}>
          <Icon name="plus" type="reg" />
          <p>הוספת מוצר</p>
        </button>
      </div>
    </main>
  )
}

function PrdctComp({ i }) {
  const [prdct, setPrdct] = useState({
    prdctList: pensionyList,
    prdctTypeList: ["ניוד", "הפקדה חודשית"],
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
        <SelectInput lbl="סוג המוצר" field="prdctType" list={prdct.prdctTypeList} />
        <TextInput lbl="סכום" field="pay" type="number" />
        <SelectInput lbl="סטטוס" field="status" list={statusList} />
      </section>
    </form>
  )
}
