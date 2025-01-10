'use client'

import { useState } from "react"

export const EntryDescription = ({ description }: { description: string }) => {
  const [isTruncate, setIsTruncate] = useState(true)
  const className = `text-xs ${isTruncate ? 'truncate' : ''}`
  return <div className="my-3 flex flex-row gap-1">
    <div className={className}>
      {description}
    </div>
    <div 
      className="text-xs cursor-pointer"
      onClick={() => setIsTruncate(!isTruncate)}
    >
      {isTruncate ? '▼' : '▲'}
    </div>
  </div>
}
