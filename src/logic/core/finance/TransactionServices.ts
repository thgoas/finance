import Collection from '@/logic/firebase/db/Collection'
import Transaction from './Transaction'
import User from '../user/User'
import MyDate from '@/logic/utils/MyDate'

export default class TransactionServices {
  private _collection = new Collection()

  async save(transaction: Transaction, user: User) {
    return this._collection.save(
      `finances/${user.email}/transactions`,
      transaction
    )
  }

  async delete(transaction: Transaction, user: User) {
    return this._collection.delete(
      `finances/${user.email}/transactions`,
      transaction.id
    )
  }
  async query(user: User) {
    const path = `finances/${user.email}/transactions`
    return await this._collection.query(path, 'date', 'desc')
  }
  async queryPerMonth(user: User, date: Date) {
    const path = `finances/${user.email}/transactions`
    return await this._collection.queryWithFilters(path, [
      { attribute: 'date', op: '>=', value: MyDate.firstDay(date) },
      { attribute: 'date', op: '<=', value: MyDate.lastDay(date) },
    ])
  }
}
