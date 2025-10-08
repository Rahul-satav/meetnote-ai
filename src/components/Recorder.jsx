import React, { useEffect, useRef, useState } from 'react'
import { summarize, extractHighlights } from '../utils/summarizer.js'
import { extractActionItems } from '../utils/actionItems.js'

const hasWebSpeech = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)

export default function Recorder({ onTranscript, onSegments, onSummary, onHighlights, onActionItems }) {
  const [listening, setListening] = useState(false)
  const [lang, setLang] = useState('en-US')
  const recRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(()=>{
    if (!hasWebSpeech) return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    rec.lang = lang
    rec.interimResults = true
    rec.continuous = true
    rec.maxAlternatives = 1
    rec.onstart = () => { startTimeRef.current = performance.now() }
    rec.onresult = (e) => {
      let finalChunk = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i]
        if (res.isFinal) finalChunk += res[0].transcript + ' '
      }
      if (finalChunk) {
        onTranscript(prev => (prev + (prev.endsWith('\n') ? '' : ' ') + finalChunk).trim())
        const now = (performance.now() - startTimeRef.current)/1000
        onSegments(prev => prev.concat([{ start: Math.max(0, now-5), end: now, text: finalChunk.trim() }]))
      }
    }
    rec.onerror = (e) => console.warn('Speech error', e.error)
    rec.onend = () => setListening(false)
    recRef.current = rec
  }, [lang])

  function start() {
    if (!hasWebSpeech) { alert('Web Speech API not supported in this browser. Try Chrome/Edge.'); return }
    setListening(true)
    recRef.current && recRef.current.start()
  }
  function stop() {
    setListening(false)
    recRef.current && recRef.current.stop()
  }
  function clearAll() {
    onTranscript(''); onSegments([]); onSummary(''); onHighlights([]); onActionItems([])
  }
  function analyzeNow() {
    onSummary(summarize(document.getElementById('transcript-textarea')?.value || ''))
    onHighlights(extractHighlights(document.getElementById('transcript-textarea')?.value || ''))
    onActionItems(extractActionItems(document.getElementById('transcript-textarea')?.value || ''))
  }
  function loadDemo() {
    const demo = `Rahul: Please fix the login bug by Friday.\nPriya: I will update the API docs today.\nTeam: We agreed to ship v1 next Monday. The only risk is payment sandbox issues.`
    onTranscript(demo); onSegments([{start:0,end:5,text:'Demo'}])
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <select className="btn" value={lang} onChange={e=>setLang(e.target.value)}>
          <option value="en-US">English (US)</option>
          <option value="en-IN">English (India)</option>
          <option value="mr-IN">Marathi (India)</option>
          <option value="hi-IN">Hindi (India)</option>
        </select>
        {!listening ? (
          <button className="btn-primary" onClick={start}>🎙️ Start dictation</button>
        ) : (
          <button className="btn" onClick={stop}>⏹ Stop</button>
        )}
        <button className="btn" onClick={clearAll}>🧹 Clear</button>
        <button className="btn" onClick={analyzeNow}>🧠 Analyze</button>
        <button className="btn" onClick={loadDemo}>🧪 Demo</button>
      </div>
      <p className="text-sm text-slate-500">Tip: Works best on Chrome/Edge. Marathi/Hindi supported via Web Speech. All processing is local in your browser.</p>
    </div>
  )
}
