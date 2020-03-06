export type Car = {
  make: string,
  model: string,
  vin: string,
  year: number,
  _id?: string,
}
export const car = (): Car => ({
  make: '',
  model: '',
  vin: '',
  year: 0,
})
