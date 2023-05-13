
import { TransactionType } from "@/logic/core/finance/TransactionType";
import Transaction from "@/logic/core/finance/Transaction";
import Id from "@/logic/core/shared/Id";

const transactionsFake: Transaction[] = [
    {
        id: Id.new(),
        description: 'Salário',
        date: new Date(2023, 4, 1),
        value: 7123.34,
        type: TransactionType.REVENUE,
    },
    {
        id: Id.new(),
        description: 'Conta de Luz',
        value: 320.00,
        date: new Date(2023, 4, 3),
        type: TransactionType.EXPENSE,
    },
    {
        id: Id.new(),
        description: 'Aluguel + Cond.',
        value: 1817.59,
        date: new Date(2023, 4, 3),
        type: TransactionType.EXPENSE,
    },
    {
        id: Id.new(),
        description: 'Cartão de Crédito',
        value: 2200.00,
        date: new Date(2023, 4, 10),
        type: TransactionType.EXPENSE,
    },
    {
        id: Id.new(),
        description: 'Conta de Água',
        value: 174.35,
        date: new Date(2023, 4, 8),
        type: TransactionType.EXPENSE,
    },
    {
        id: Id.new(),
        description: 'Mensalidade MBA',
        value: 750.00,
        date: new Date(2023, 4, 2),
        type: TransactionType.EXPENSE,
    },
    
    {
        id: Id.new(),
        description: 'Investimentos',
        date: new Date(2023, 4, 1),
        value: 2123.34,
        type: TransactionType.REVENUE,
    },
]

export default transactionsFake