self.addEventListener('install', (e)=>{
  self.skipWaiting()
})
self.addEventListener('activate', (e)=>{
  clients.claim()
})
self.addEventListener('fetch', (event)=>{
  // network-first
})
