import PaymentMethods from '../paymentMethods/PaymentMethods'
import TransactionGroup from '../groups/TransactionGroup'
import { TransactionStatus } from './TransactionStatus'
import { TransactionType } from './TransactionType'
import TransactionInstallments from './TransactionInstallments'

export default interface Transaction {
  id?: string
  description: string
  value: number
  date: Date
  type: TransactionType
  group: TransactionGroup
  method: PaymentMethods
  status: TransactionStatus
  installments: TransactionInstallments[]
}
const emptyTransactionGroup: TransactionGroup = {
  description: '',
  name: '',
}
const emptyTransactionMethod: PaymentMethods = {
  description: '',
  name: '',
}
const emptyTransactionInstallments: TransactionInstallments = {
  installmentNumber: 1,
  date: new Date(),
  value: 0,
} 
export const emptyTransaction: Transaction = {
  description: '',
  value: 0,
  date: new Date(),
  type: TransactionType.EXPENSE,
  status: TransactionStatus.OPEN,
  group: emptyTransactionGroup,
  method: emptyTransactionMethod,
  installments: [emptyTransactionInstallments]
}
