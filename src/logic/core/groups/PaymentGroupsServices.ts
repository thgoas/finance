import Collection from "@/logic/firebase/db/Collection";
import PaymentGroups from "./PaymentGroups";
import User from "../user/User";
import MyDate from "@/logic/utils/MyDate";

export default class PaymentGroupsServices {
  private _collection = new Collection()

  async save(PaymentGroups: PaymentGroups, user: User) {
    return this._collection.save(
      `paymentGroups/${user.email}/groups`,
      PaymentGroups
    )
  }

  async delete(PaymentGroups: PaymentGroups, user: User) {
    return this._collection.delete(
      `paymentGroups/${user.email}/groups`,
      PaymentGroups.id
    )
  }
  async query(user: User) {
    const path = `paymentGroups/${user.email}/groups`
    return await this._collection.query(path, 'date', 'desc')
  }
  async queryPerMonth(user: User, date: Date) {
    const path = `paymentGroups/${user.email}/groups`
    return await this._collection.queryWithFilters(path, [
      { attribute: 'date', op: '>=', value: MyDate.firstDay(date) },
      { attribute: 'date', op: '<=', value: MyDate.lastDay(date) },
    ])
  }

}