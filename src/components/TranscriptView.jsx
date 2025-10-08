import React from 'react'

export default function TranscriptView({ transcript, setTranscript }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold">Transcript</h2>
        <span className="text-xs text-slate-500">{transcript?.length || 0} chars</span>
      </div>
      <textarea
        id="transcript-textarea"
        className="transcript"
        value={transcript}
        onChange={e=>setTranscript(e.target.value)}
        placeholder="Your live transcript will appear here…"
      />
    </div>
  )
}
