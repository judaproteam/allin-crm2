import { proxy, useSnapshot } from 'valtio'

export const store = proxy({
  editSale: {
    id: 0,
    company: '',
    branch: '',
    prdct: '',
    prdctType: '',
    status: '',
    pay: 0,
  },
  deleteId: null as number | null,
})

export function useSnap() {
  const snap = useSnapshot(store)

  return snap
}
