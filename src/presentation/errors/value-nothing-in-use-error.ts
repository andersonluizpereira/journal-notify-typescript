export class ValueInNothingUseError extends Error {
  constructor (value: string) {
    super(`${value}`)
    this.name = 'ValueInNothingUseError'
  }
}
