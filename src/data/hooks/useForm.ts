import { useCallback, useState } from 'react'

export default function useForm<T = any>(initialData?: T) {
  const [data, setData] = useState<T>(initialData ?? ({} as T))

  const changeData = useCallback(function (data: T) {
    setData(data)
  },[])

  const changeAttribute = useCallback(
    function (attribute: string, fn?: Function) {
      return (valueOrEvent: any) => {
        const value = valueOrEvent?.target?.value ?? valueOrEvent
        setData({ ...data, [attribute]: fn?.(value) ?? value })
      }
    },
    [data]
  )
  return {
    data,
    changeData,
    changeAttribute,
  }
}
