
import { IconArrowsDoubleSwNe, IconCash, IconCreditCard } from '@tabler/icons-react'
import Transaction from '@/logic/core/finance/Transaction'
import { TransactionType } from '@/logic/core/finance/TransactionType'
import SummaryItem from './SummaryItem'

interface SummaryProps {
    transaction: Transaction[]
    className?: string
}

export default function Summary(props: SummaryProps) {
    const totalizar = (total: number, r: Transaction) => total + r.value

    const income = props.transaction
        .filter((r) => r.type === TransactionType.REVENUE)
        .reduce(totalizar, 0)

    const expense = props.transaction
        .filter((r) => r.type === TransactionType.EXPENSE)
        .reduce(totalizar, 0)

    const total = income - expense

    return (
        <div className={`
            grid grid-cols-1 md:grid-cols-3 gap-4
        `}>
            <SummaryItem
                title='Receitas'
                value={income}
                icon={<IconCash />}
                iconClassName="text-green-500"
            />
            <SummaryItem
                title='Despesas'
                value={expense}
                icon={<IconCreditCard />}
                iconClassName="text-red-500"
            />
            <SummaryItem
                title='Total'
                value={total}
                icon={<IconArrowsDoubleSwNe />}
                iconClassName="text-yellow-500"
                valueClassName={total > 0 ? 'text-green-500' : total < 0 ? 'text-red-500' : ''}
            />
        </div>
    )
}