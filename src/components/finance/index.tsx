import Page from '../template/Page'
import Header from '../template/Header'
import Content from '../template/Content'
import List from './List'
import { emptyTransaction } from '@/logic/core/finance/Transaction'
import Form from './Form'
import NotFound from '../template/NotFound'
import { Button, SegmentedControl } from '@mantine/core'
import { IconLayoutGrid, IconList, IconPlus } from '@tabler/icons-react'

import useTransaction, { ExhibitionType } from '@/data/hooks/useTransaction'
import FieldMonthYear from '../template/FieldMonthYear'
import MyGrid from './grid'
import Summary from './Summary'
import NotificationSystem from '../template/NotificationSystem'

export default function Finance() {
  const {
    handleDelete,
    handleSave,
    transaction,
    transactions,
    select,
    date,
    changeDate,
    changeExhibitionType,
    exhibitionType,
  } = useTransaction()

  function renderControls() {
    return (
      <div className="flex justify-between">
        <FieldMonthYear date={date} dateChanged={changeDate} />
        <div className="flex gap-5 items-center">
          <NotificationSystem />
          <Button
            className="bg-blue-500 "
            leftIcon={<IconPlus />}
            onClick={() => select(emptyTransaction)}
          >
            Nova Transação
          </Button>
          <SegmentedControl
            data={[
              { label: <IconList />, value: 'list' },
              { label: <IconLayoutGrid />, value: 'grid' },
            ]}
            onChange={(type) => changeExhibitionType(type as ExhibitionType)}
          />
        </div>
      </div>
    )
  }

  function renderTransaction() {
    return exhibitionType === 'list' ? (
      <List transactions={transactions} selectTransaction={select} />
    ) : (
      <MyGrid transactions={transactions} selectedTransaction={select} />
    )
  }

  return (
    <Page>
      <Header />
      <Content className="gap-5">
        
        {transaction ? (
          <Form
            transaction={transaction}
            cancel={() => select(null)}
            save={handleSave}
            delete={handleDelete}
          />
        ) : transactions.length ? (
          <>
            <Summary transaction={transactions} />
            {renderControls()}
            {renderTransaction()}
          </>
        ) : (
          <NotFound>Nenhuma Transação encontrada</NotFound>
        )}
      </Content>
    </Page>
  )
}
