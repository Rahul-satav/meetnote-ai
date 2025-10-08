import React from 'react'
import { exportTXT, exportJSON, exportMD, exportCSV, exportSRT, exportVTT } from '../utils/exports.js'

export default function Exports({ transcript, segments, summary, highlights, actionItems }) {
  const payload = { transcript, segments, summary, highlights, actionItems, createdAt: new Date().toISOString() }
  return (
    <div className="flex flex-wrap gap-3">
      <button className="btn" onClick={()=>exportTXT(transcript)}>⬇️ Download TXT</button>
      <button className="btn" onClick={()=>exportMD({ summary, highlights, actionItems })}>⬇️ Download MD</button>
      <button className="btn" onClick={()=>exportCSV(actionItems)}>⬇️ Download CSV (Jira)</button>
      <button className="btn" onClick={()=>exportSRT(segments)}>⬇️ Download SRT</button>
      <button className="btn" onClick={()=>exportVTT(segments)}>⬇️ Download VTT</button>
      <button className="btn" onClick={()=>exportJSON(payload)}>⬇️ Download JSON</button>
      <div className="text-sm text-slate-500 self-center">All files generated locally in your browser.</div>
    </div>
  )
}
