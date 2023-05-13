import MyDate from '@/logic/utils/MyDate'
import { Button, NumberInput, Popover } from '@mantine/core'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useState } from 'react'

export interface FieldMonthYearProps {
  date?: Date
  dateChanged?: (date: Date) => void
}

export default function FieldMonthYear(props: FieldMonthYearProps) {
  const hoje = new Date()

  const [date, setDate] = useState<Date>(
    new Date(
      props.date?.getFullYear() ?? hoje.getFullYear(),
      props.date?.getMonth() ?? hoje.getMonth(),
      1
    )
  )

  function changeYear(year: number) {
    if (!year) return
    const newDAte = new Date(date)
    newDAte.setFullYear(year)
    setDate(newDAte)
    props.dateChanged?.(newDAte)
  }

  function changeMonth(month: number) {
    const newDate = new Date(date)
    newDate.setMonth(month)
    setDate(newDate)
    props.dateChanged?.(newDate)
  }

  function increment() {
    const newDAte = new Date(date)
    newDAte.setMonth(newDAte.getMonth() + 1)
    setDate(newDAte)
    props.dateChanged?.(newDAte)
  }

  function decrement() {
    const newDAte = new Date(date)
    newDAte.setMonth(newDAte.getMonth() - 1)
    setDate(newDAte)
    props.dateChanged?.(newDAte)
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        className={`
                flex justify-center items-center bg-red-500
                text-white cursor-pointer p-1
            `}
        color="red"
        onClick={decrement}
      >
        <IconChevronLeft size={14} />
      </Button>
      <Popover withArrow>
        <Popover.Target>
          <Button
            className={`
                        bg-gradient-to-r from-indigo-600 to-cyan-600
                        text-white cursor-pointer select-none 
                        w-full sm:w-44 px-3
                    `}
          >
            {MyDate.mmyy.format(date)}
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <div className="flex justify-center mb-5">
            <NumberInput value={date.getFullYear()} onChange={changeYear} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {MyDate.months().map((month, i) => {
              const selected = date.getMonth() === i
              return (
                <Button
                  key={i}
                  color={selected ? 'red' : 'blue'}
                  className={`${selected ? 'bg-red-500' : 'bg-blue-500'}`}
                  onClick={() => changeMonth(i)}
                >
                  {month}
                </Button>
              )
            })}
          </div>
        </Popover.Dropdown>
      </Popover>
      <Button
        className={`
                flex justify-center items-center bg-red-500
                text-white cursor-pointer p-1
            `}
        color="red"
        onClick={increment}
      >
        <IconChevronRight size={14} />
      </Button>
    </div>
  )
}
