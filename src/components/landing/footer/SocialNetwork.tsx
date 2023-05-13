import React from "react"
import Link from "next/link"

interface SocialNetworkProps {
    ico: any
    url: string
}

export default function SocialNetwork(props: SocialNetworkProps) {
    return (
        <Link href={props.url} target="_blank">
            <div className="bg-zinc-800 rounded-lg p-1 mr-3 cursor-pointer">
                {React.cloneElement(props.ico, {
                    size: 35,
                    strokeWidth: 1,
                    className: "text-indigo-400",
                })}
            </div>
        </Link>
    )
}