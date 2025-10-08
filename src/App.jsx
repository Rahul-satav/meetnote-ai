import React, { useState, useRef } from 'react'
import Recorder from './components/Recorder.jsx'
import TranscriptView from './components/TranscriptView.jsx'
import SummaryPanel from './components/SummaryPanel.jsx'
import Exports from './components/Exports.jsx'
import logo from '/logo.png'

export default function App() {
  const [transcript, setTranscript] = useState('')
  const [segments, setSegments] = useState([]) // {start,end,text}
  const [highlights, setHighlights] = useState([])
  const [summary, setSummary] = useState('')
  const [actionItems, setActionItems] = useState([])

  return (
    <div>
      <header className="border-b bg-white">
        <div className="container-box flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="MeetNote AI" className="h-10 w-10 rounded-full"/>
            <div className="font-semibold text-slate-800">MeetNote AI</div>
            <span className="badge">Audio → Action Items</span>
          </div>
          <div className="text-sm text-slate-500">Client-side • GitHub Pages Ready</div>
        </div>
      </header>

      <main className="container-box space-y-5">
        <div className="card">
          <Recorder
            onTranscript={setTranscript}
            onSegments={setSegments}
            onSummary={setSummary}
            onHighlights={setHighlights}
            onActionItems={setActionItems}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="card">
            <TranscriptView transcript={transcript} setTranscript={setTranscript} />
          </div>
          <div className="card">
            <SummaryPanel transcript={transcript} summary={summary} highlights={highlights} actionItems={actionItems} setSummary={setSummary} setHighlights={setHighlights} setActionItems={setActionItems} />
          </div>
        </div>

        <div className="card">
          <Exports transcript={transcript} segments={segments} summary={summary} highlights={highlights} actionItems={actionItems}/>
        </div>
      </main>

      <footer className="container-box text-center text-xs text-slate-500">
        © {new Date().getFullYear()} MeetNote AI — Runs fully in your browser.
      </footer>
    </div>
  )
}
