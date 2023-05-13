import Currency from "@/logic/utils/Currency"
import React from "react"


export interface SummaryItemProps {
    title: string
    value: number
    icon: any
    valueClassName?: string
    iconClassName?: string
}

export default function SummaryItem(props: SummaryItemProps) {
    return (
        <div className={`
            relative flex flex-col bg-black
            pt-4 pb-3 px-5 rounded-lg
            border border-zinc-800 text-white
        `}>
            <div className="text-sm text-zinc-500">{props.title}</div>
            <div className="flex justify-between items-center">
                <span className={`text-3xl font-black ${props.valueClassName ?? ''}`}>
                    {Currency.format(props.value)}
                </span>
                <span>
                    {React.cloneElement(props.icon, {
                        size: 60,
                        strokeWidth: 1,
                        className: `${props.iconClassName ?? ''}`,
                    })}
                </span>
            </div>
        </div>
    )
}