import Collection from "@/logic/firebase/db/Collection";
import User from "../user/User";
import MyDate from "@/logic/utils/MyDate";
import PaymentMethods from "./PaymentMethods";

export default class PaymentMethodsServices {
  private _collection = new Collection()

  async save(PaymentMethods: PaymentMethods, user: User) {
    return this._collection.save(
      `paymentMethods/${user.email}/methods`,
      PaymentMethods
    )
  }

  async delete(PaymentMethods: PaymentMethods, user: User) {
    return this._collection.delete(
      `paymentMethods/${user.email}/methods`,
      PaymentMethods.id
    )
  }
  async query(user: User) {
    const path = `paymentMethods/${user.email}/methods`
    return await this._collection.query(path, 'date', 'desc')
  }
  async queryPerMonth(user: User, date: Date) {
    const path = `paymentMethods/${user.email}/methods`
    return await this._collection.queryWithFilters(path, [
      { attribute: 'date', op: '>=', value: MyDate.firstDay(date) },
      { attribute: 'date', op: '<=', value: MyDate.lastDay(date) },
    ])
  }

}