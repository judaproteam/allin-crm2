import { store } from "@/utils/valtio/store"
import { CirclePlus, CircleX, XIcon } from "lucide-react"
import { useRef } from "react"

export default function CreateChips({ lbl, opts, field, placeholder, dtls, className }) {
  const ref = useRef()

  function addItem(e) {
    if (e.key !== "Enter") return

    const val = ref.current.value
    if (val.trim()) {
      store[field].push(val)
      ref.current.value = ""
    }
  }

  function removeItem(i) {
    store[field].splice(i, 1)
  }

  return (
    <div className="max-w-52 sm:max-w-72">
      <label htmlFor="chips">
        <p className="font-medium mb-2 flex justify-between">
          {lbl} <span className="text-gray-400 font-normal">{dtls}</span>
        </p>
      </label>
      <section className="inline-flex rounded-lg border ">
        <input
          ref={ref}
          onKeyDown={addItem}
          aria-labelledby="chips"
          type="text"
          placeholder={placeholder}
          className={`h-12 px-4 w-full rounded-lg border-none ${className}`}
        />
        <button
          type="button"
          onClick={addItem}
          className="h-12 w-12 flex-shrink-0 inline-flex justify-center items-center rounded-e-md bg-blue-50 text-blue-800 hover:bg-blue-100">
          <CirclePlus size={20} strokeWidth={1.5} />
        </button>
      </section>

      {/* CHIPS */}
      <section className="mt-2">
        <div className="flex gap-2">
          {opts.map((op, i) => {
            return (
              <div className="flex items-center gap-3 bg-white border rounded-full py-1 pl-1.5 pr-3">
                <div className="whitespace-nowrap font-medium text-gray-800">{op}</div>
                <button
                  onClick={() => removeItem(i)}
                  className="inline-flex justify-center items-center rounded-full text-red-400">
                  <XIcon size={18} strokeWidth={1.25} />
                </button>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
