import React from "react"

interface PageTitleProps {
    main: string
    ico?: any
    secondary?: string
    className?: string
}

export default function PageTitle(props: PageTitleProps) {
    return (
        <div className={`flex items-center gap-2 ${props.className ?? ''}`}>
            {props.ico && (
                <div className={`
                    text-zinc-500
                `}>{React.cloneElement(props.ico, {
                    stroke: 1,
                    size: props.secondary ? 50 : 24
                })}</div>
            )}
            <div className="flex flex-col text-zinc-500">
                <h1 className="text-2xl font-black">
                    {props.main}
                </h1>
                {props.secondary && (
                    <h2 className="text-sm font-thin -mt-1">
                        {props.secondary}
                    </h2>
                )}
            </div>
        </div>
    )
}