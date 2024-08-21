import { updateSale } from '../db/sale/updateSale'

async function run() {
  const res = await updateSale
  console.log(res)
}
run()
