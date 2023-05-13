export default class Cpf {
  private static _default = '???.???.???-??'
  
  static format(value: string): string {
      const numbers = Cpf.unFormat(value).split('')
      return numbers.reduce((formatted: string, number: string) => {
          return formatted.replace('?', number)
      }, Cpf._default).split('?')[0].replace(/[-.]$/, '')
  }

  static unFormat(value: string): string {
      return value.replace(/[^0-9]+/g, '')
  }
}