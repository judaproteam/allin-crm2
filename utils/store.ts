import { proxy } from 'valtio'
import { useProxy } from 'valtio/utils'

export const store = proxy({
  editSale: {
    company: '',
    branch: '',
    prdct: '',
    prdctType: '',
    status: '',
    pay: '',
  },
  deleteId: null as number | null,
})

export function useSnap() {
  const snap = useProxy(store)

  return snap
}
