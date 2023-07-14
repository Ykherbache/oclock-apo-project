export function cleanArray(arr) {
  return arr
    .map((value) => (typeof value === 'string' ? value.trim() : value)) // trim whitespace
    .filter((value, index, self) => value && self.indexOf(value) === index) // filter null and duplicates
}
