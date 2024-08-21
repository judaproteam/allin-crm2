async function run() {
  let dt = { gte: '2024-07-31', lte: '2024-08-31' }
  // dt = {
  //   gte: new Date(filter.gte).toISOString(),
  //   lte: new Date(filter.lte).toISOString(),
  // }

  for (const key in dt) {
    dt[key] = new Date(dt[key]).toISOString()
  }
  console.log('dt', dt)
}
run()
