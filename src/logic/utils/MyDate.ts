export default class MyDate {
  static ddmmyy = {
    format(dt: Date, separator: string = '/'): string {
      const day = dt.getDate().toString().padStart(2, '0')
      const month = (dt.getMonth() + 1).toString().padStart(2, '0')
      return `${day}${separator}${month}${separator}${dt.getFullYear()}`
    }
  }
}