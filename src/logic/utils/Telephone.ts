export default class Telephone {
  private static _default = '(??) ?????-????'

  static format(value: string): string {
      const numbers = Telephone.unFormat(value).split('')
      return numbers.reduce((formatted: string, number: string) => {
          return formatted.replace('?', number)
      }, Telephone._default).split('?')[0].trim().replace(/[()-]$/, '')
  }

  static unFormat(value: string): string {
      return value.replace(/[^0-9]+/g, '')
  }
}