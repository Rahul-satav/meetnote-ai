import React, { useEffect } from 'react'
import { summarize, extractHighlights } from '../utils/summarizer.js'
import { extractActionItems } from '../utils/actionItems.js'

export default function SummaryPanel({ transcript, summary, highlights, actionItems, setSummary, setHighlights, setActionItems }) {
  useEffect(()=>{
    if (!transcript) return
    const t = transcript
    setSummary(summarize(t))
    setHighlights(extractHighlights(t))
    setActionItems(extractActionItems(t))
  }, [transcript])

  return (
    <div className="grid gap-4">
      <div>
        <div className="font-semibold mb-1">Summary</div>
        <div className="text-sm text-slate-700 whitespace-pre-line">{summary || '—'}</div>
      </div>
      <div>
        <div className="font-semibold mb-1">Highlights</div>
        <ul className="list-disc pl-5 text-sm text-slate-700">
          {(highlights||[]).map((h,i)=>(<li key={i}>{h}</li>))}
          {!highlights?.length && <li className="text-slate-400">—</li>}
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-1">Action Items</div>
        <ul className="list-disc pl-5 text-sm text-slate-700">
          {(actionItems||[]).map((a,i)=>(<li key={i}>
            <span className="font-medium">{a.summary}</span>
            {a.assignee && <span> — @{a.assignee}</span>}
            {a.due && <span> (due: {a.due})</span>}
            <span className="ml-2 badge">{a.priority}</span>
          </li>))}
          {!actionItems?.length && <li className="text-slate-400">—</li>}
        </ul>
      </div>
    </div>
  )
}
