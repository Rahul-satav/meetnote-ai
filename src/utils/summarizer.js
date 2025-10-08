// Simple frequency-based summarizer (client-side, rule-of-thumb)
export function summarize(text, maxSentences = 5) {
  if (!text) return ''
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(Boolean)
  if (sentences.length <= maxSentences) return sentences.join(' ')

  // score sentences by word frequency (stopwords removed)
  const stop = new Set(['the','is','a','an','and','of','to','in','for','on','with','that','this','be','as','are','by','at','or','we','it','from','our','your','you','i'])
  const freq = new Map()
  const words = text.toLowerCase().match(/[a-z0-9']+/g) || []
  for (const w of words) if (!stop.has(w)) freq.set(w, (freq.get(w)||0)+1)
  const sentenceScores = sentences.map(s => {
    const ws = s.toLowerCase().match(/[a-z0-9']+/g) || []
    let score = 0
    for (const w of ws) if (freq.has(w)) score += freq.get(w)
    return { s, score }
  })
  sentenceScores.sort((a,b)=>b.score-a.score)
  return sentenceScores.slice(0, maxSentences).map(x=>x.s).join(' ')
}

export function extractHighlights(text, max = 8) {
  const lines = text.split(/\n+/).map(l => l.trim()).filter(Boolean)
  const picks = []
  for (const l of lines) {
    if (/(decision|agree|final|blocked|risk|issue|important|note)/i.test(l)) picks.push(l)
  }
  // fallbacks: take a few strong sentences
  if (picks.length < 3) {
    const sents = text.split(/(?<=[.!?])\s+/).filter(s=>s.length>40)
    picks.push(...sents.slice(0, max - picks.length))
  }
  return picks.slice(0, max)
}
