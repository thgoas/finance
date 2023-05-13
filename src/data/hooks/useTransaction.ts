import Transaction from '@/logic/core/finance/Transaction'
import { useCallback, useContext, useEffect, useState } from 'react'
import AuthenticationContext from '../contexts/Authentication'
import services from '@/logic/core'
import { notifications } from '@mantine/notifications'

export type ExhibitionType = 'list' | 'grid'

export default function useTransaction() {
  const { user } = useContext(AuthenticationContext)
  const [date, setDate] = useState(new Date())
  const [exhibitionType, setExhibitionType] = useState('list')
  const [transactions, setTransactions] =
    useState<Transaction[]>([])
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  const searchTransactions = useCallback( async function () {
    if(!user) return
    const transactions = await services.transaction.queryPerMonth(user, date)
    setTransactions(transactions)
  }, [user, date])

  useEffect(() => {
    searchTransactions()
  },[searchTransactions, date])
 

  async function handleSave(transaction: Transaction) {
  
    if (!user) return

    if(!transaction.description && transaction.value < 1){
      notifications.show({
        title: 'Default notification',
        message: 'Hey there, your code is awesome! 🤥',
      })
      return
    }
    services.transaction.save(transaction, user)
    setTransaction(null)
    await searchTransactions()
  }

  async function handleDelete(transaction: Transaction) {
  if(!user) return
    await services.transaction.delete(transaction, user)
    setTransaction(null)
    await searchTransactions()
  }
  return {
    transactions,
    transaction,
    handleSave,
    handleDelete,
    select: setTransaction,
    date,
    changeDate: setDate,
    exhibitionType,
    changeExhibitionType: setExhibitionType,
  }
}
