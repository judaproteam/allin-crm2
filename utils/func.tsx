export const rng = (x: number, min: number, max: number) => {
  return x >= min && x <= max
}

export const genId = () => {
  return Math.floor(Math.random() * 9999999)
}

export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

function debounce(time = 2000) {
  let run
  clearTimeout(run)

  run = setTimeout(() => {}, time)
}
