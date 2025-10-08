function downloadBlob(filename, mime, text) {
  const blob = new Blob([text], { type: mime })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000)
}

export function exportTXT(transcript) {
  downloadBlob('transcript.txt', 'text/plain', transcript || '')
}

export function exportJSON(payload) {
  downloadBlob('session.json', 'application/json', JSON.stringify(payload, null, 2))
}

export function exportMD({ summary, highlights, actionItems }) {
  const md = [
    '# MeetNote AI — Notes',
    '',
    '## Summary',
    summary || '',
    '',
    '## Highlights',
    ...(highlights||[]).map(h => `- ${h}`),
    '',
    '## Action Items',
    ...(actionItems||[]).map(a => `- [ ] ${a.summary} ${a.assignee?`(@${a.assignee})`:''} ${a.due?`(due: ${a.due})`:''} (${a.priority})`)
  ].join('\n')
  downloadBlob('notes.md', 'text/markdown', md)
}

export function exportCSV(actionItems) {
  const rows = [['Summary','Description','Assignee','DueDate','Labels']]
  for (const a of actionItems||[]) {
    rows.push([a.summary, a.summary, a.assignee, a.due, 'meetnote'])
  }
  const csv = rows.map(r => r.map(x => '"' + String(x||'').replaceAll('"','""') + '"').join(',')).join('\n')
  downloadBlob('jira-import.csv', 'text/csv', csv)
}

export function exportSRT(segments) {
  // segments: [{start,end,text}]
  const srt = (segments||[]).map((seg, i) => {
    const toS = s => {
      const ms = Math.floor((s%1)*1000).toString().padStart(3,'0')
      const t = new Date(Math.floor(s)*1000).toISOString().substr(11,8)
      return t + ',' + ms
    }
    return `${i+1}\n${toS(seg.start)} --> ${toS(seg.end)}\n${seg.text}\n`
  }).join('\n')
  downloadBlob('captions.srt', 'text/plain', srt)
}

export function exportVTT(segments) {
  const vtt = ['WEBVTT',''].concat((segments||[]).map(seg => {
    const toS = s => {
      const ms = Math.floor((s%1)*1000).toString().padStart(3,'0')
      const t = new Date(Math.floor(s)*1000).toISOString().substr(11,8)
      return t + '.' + ms
    }
    return `${toS(seg.start)} --> ${toS(seg.end)}\n${seg.text}\n`
  })).join('\n')
  downloadBlob('captions.vtt', 'text/vtt', vtt)
}
