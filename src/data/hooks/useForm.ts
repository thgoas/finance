import { useState } from "react";

export default function useForm<T = any> (initialData: T) {
  const [data, setData] = useState<T>(initialData)
  function changeAttribute (attribute: string, fn?: Function) {
    return (valueOrEvent: any) => {
      const value = valueOrEvent?.target?.value ?? valueOrEvent
      setData({...data, [attribute]: fn?.(value) ?? value})
    }
  }
  return {
    data,
    setData,
    changeAttribute,
  }
}