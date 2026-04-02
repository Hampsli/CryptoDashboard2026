import { useState } from 'react'

type Props = {
  text: string
}

const LIMIT = 300

export const DetailDescription = ({ text }: Props) => {
  const [expanded, setExpanded] = useState(false)

  const clean = text.replace(/<[^>]*>/g, '')

  if (!clean) return null

  const isLong    = clean.length > LIMIT
  const displayed = expanded || !isLong ? clean : clean.slice(0, LIMIT) + '...'

  return (
    <div className="text-sm text-slate-700 leading-relaxed">
      <p>{displayed}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-2 text-slate-900 font-medium underline
                     focus:outline-none focus:ring-2 focus:ring-slate-900
                     focus:ring-offset-2 rounded"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}