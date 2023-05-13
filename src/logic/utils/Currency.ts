export default class Currency {
  private static _language = 'pt-Br'
  private static _currency = 'BRL'

  static format (num: number):string {
    return (num ?? 0).toLocaleString(Currency._language, {
      style: 'currency', currency: Currency._currency
    })
  }

  static unFormat (value: string): number {
    const numbers = value.replace(/[^0-9]+/g, "")
    const i = numbers.length - 2
    return Number(`${numbers.substring(0, i)}.${numbers.substring(i)}`)
  }
}