import { useState } from 'react'
import Icon from '../../ui/Icon'
import { rng } from '@/utils/func'
import { agntType } from '@/utils/types'
import { useUser } from '@/context/UserProvider'

export default function Collab({ agnts }: { agnts: agntType[] }) {
  const user = useUser()
  const [share1, setShare1] = useState(50)
  const [share2, setShare2] = useState(50)

  return (
    <main className="flex gap-12">
      <section>
        <label htmlFor="agntId" className="block mb-1 ms-1">
          <p>שם סוכן 1</p>
        </label>
        <div className="inline-flex items-center gap-1 rounded-md border p-1 border-slate-200 w-auto">
          <select name="agntId" defaultValue={user?.id} className="h-8 w-40 px-4 outline-none">
            {agnts.map((agnt) => (
              <option value={agnt.id} key={agnt.id}>
                {agnt.name}
              </option>
            ))}
          </select>
          <span className="border-l border-slate-300 block w-px h-8 me-3 ms-1" />
          <label htmlFor="agntShare" className="">
            <Icon name="percent" className="bg-slate-500" />
          </label>
          <input
            className="w-10 outline-none h-8 ps-3"
            type="number"
            required
            name="agntShare"
            min="0"
            max="100"
            placeholder="50"
            id="agntShare"
            value={share1}
            onChange={(e) => {
              const val = parseInt(e.target.value)

              if (rng(val, 0, 100)) {
                setShare2(100 - val)
                setShare1(val)
              }
            }}
          />
        </div>
      </section>

      <Icon name="handshake" className="size-7 bg-slate-300 self-end mb-2" />

      <section>
        <label htmlFor="agnt2Id" className="block mb-1 ms-1">
          <p>שם סוכן 2</p>
        </label>
        <div className="inline-flex items-center gap-1 rounded-md border p-1 border-slate-200 w-auto">
          <select name="agnt2Id" id="agnt2Id" className="h-8 w-40 px-4 outline-none">
            {agnts.map((agnt) => (
              <option value={agnt.id} key={agnt.id}>
                {agnt.name}
              </option>
            ))}
          </select>
          <span className="border-l border-slate-300 block w-px h-8 me-3 ms-1" />
          <label htmlFor="agnt2Share" className="">
            <Icon name="percent" className="bg-slate-500" />
          </label>
          <input
            className="w-10 outline-none h-8 ps-3"
            type="number"
            name="agnt2Share"
            min="0"
            max="100"
            placeholder="50"
            id="agnt2Share"
            value={share2}
            onChange={(e) => {
              const val = parseInt(e.target.value)

              if (rng(val, 0, 100)) {
                setShare1(100 - val)
                setShare2(val)
              }
            }}
          />
        </div>
      </section>
    </main>
  )
}
