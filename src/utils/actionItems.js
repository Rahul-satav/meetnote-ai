// Crude rule-based action item extractor
export function extractActionItems(text) {
  const items = []
  const lines = text.split(/\n|(?<=[.!?])\s+/).map(l=>l.trim()).filter(Boolean)
  for (const l of lines) {
    if (/(please|plz|assign|todo|task|action|fix|implement|update|create|prepare|review|send)/i.test(l)) {
      // assignee heuristic (proper name or @handle or "to <name>")
      const assigneeMatch = l.match(/(?:to|for)\s+([A-Z][a-zA-Z]+|@[a-zA-Z0-9_]+)/)
      const dueMatch = l.match(/by\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|today|eod|\d{4}-\d{2}-\d{2}|\d{1,2}\/(?:\d{1,2}|\d{4}))/i)
      const priority = /(urgent|high|low|p\d)/i.test(l) ? 'High' : 'Normal'
      items.push({
        summary: l.length > 140 ? l.slice(0, 137) + '...' : l,
        assignee: assigneeMatch ? assigneeMatch[1] : '',
        due: dueMatch ? dueMatch[1] : '',
        priority
      })
    }
  }
  // de-duplicate by summary
  const seen = new Set()
  return items.filter(it => (seen.has(it.summary) ? false : (seen.add(it.summary), true)))
}
