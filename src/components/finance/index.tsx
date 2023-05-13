import Page from "../template/Page";
import Header from "../template/Header";
import Content from "../template/Content";
import List from "./List";
import { use, useState } from "react";
import Transaction, { emptyTransaction } from "@/logic/core/finance/Transaction";
import transactionsFake from "@/data/constants/transactionsFake";
import Form from "./Form";
import NotFound from "../template/NotFound";
import Id from "@/logic/core/shared/Id";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Finance() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(transactionsFake)
  const [transaction, setTransaction] = useState<Transaction | null>(null)

  function handleSave (transaction: Transaction) {
    const otherTransactions = transactions.filter(f => f.id !== transaction.id)
    setTransactions([...otherTransactions, {
      ...transaction,
      id: transaction.id ?? Id.new()
    }])
    setTransaction(null)
  }

  function handleDelete (transaction: Transaction) {
    const otherTransactions = transactions.filter(f => f.id !== transaction.id)
    setTransactions(otherTransactions)
    setTransaction(null)
  }

  return (
    <Page>
      <Header />
      <Content className="gap-5">
        <Button 
          className="bg-blue-500"
          leftIcon={<IconPlus />}
          onClick={() => setTransaction(emptyTransaction)}
        >
          Nova Transação
        </Button>
        {transaction ? (
          <Form 
          transaction={transaction} 
          cancel={() => setTransaction(null)} 
          save={handleSave}
          delete={handleDelete}
          />
        ) : transactions.length ? (
          <List
            transactions={transactions}
            selectTransaction={setTransaction}
          />
        ): (
          <NotFound>
            Nenhuma Transação encontrada
          </NotFound>
        )}
      </Content>
    </Page>
  );
}
