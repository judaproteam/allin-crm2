import { proxy, useSnapshot } from 'valtio'

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
  const snap = useSnapshot(store)

  return snap
}
