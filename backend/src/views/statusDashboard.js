export function renderStatusDashboard(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkilloraPath API | Enterprise Backend</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Outfit', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            primary: '#0284c7',
            accent: '#38bdf8'
          }
        }
      }
    }
  </script>
  <style>
    body { background: radial-gradient(circle at 50% 0%, #0f172a 0%, #020617 100%); }
    .glass { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .glow-dot { box-shadow: 0 0 12px #22c55e, 0 0 24px #22c55e; }
  </style>
</head>
<body class="min-h-screen text-slate-100 font-sans flex flex-col justify-between p-4 sm:p-8">

  <!-- Header -->
  <div class="max-w-5xl mx-auto w-full">
    <header class="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 mb-8 border-b border-slate-800">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-sky-500/20">
          S
        </div>
        <div>
          <h1 class="text-xl font-bold tracking-tight text-white">SkilloraPath</h1>
          <p class="text-xs text-slate-400 font-mono">Enterprise Backend API v1.0.0</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <a href="https://tejaswiiiiiisen.github.io/Isolenne/" target="_blank" class="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition-all shadow-md shadow-sky-500/20 flex items-center gap-1.5">
          <span>Live Frontend Website</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </header>

    <!-- Main Status Card -->
    <main class="space-y-6">
      <div class="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
              <span class="w-2 h-2 rounded-full bg-emerald-400 glow-dot animate-pulse"></span>
              ALL SYSTEMS OPERATIONAL
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Backend Server is Live & Healthy</h2>
            <p class="text-sm text-slate-400 mt-1 max-w-xl">
              Connected to Render Cloud infrastructure with automatic SSL, Supabase Database sync, and CORS enabled for all origins.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <div class="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span class="block text-xs text-slate-400 font-mono">SERVER STATUS</span>
              <span class="text-lg font-bold text-emerald-400">200 OK</span>
            </div>
            <div class="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span class="block text-xs text-slate-400 font-mono">LATENCY</span>
              <span class="text-lg font-bold text-sky-400">~24ms</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span class="text-[11px] text-slate-400 font-mono block">PLATFORM</span>
            <span class="text-sm font-semibold text-slate-200">Render Cloud</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span class="text-[11px] text-slate-400 font-mono block">DATABASE</span>
            <span class="text-sm font-semibold text-slate-200">Supabase REST</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span class="text-[11px] text-slate-400 font-mono block">CORS ACCESS</span>
            <span class="text-sm font-semibold text-emerald-400">Enabled (*)</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <span class="text-[11px] text-slate-400 font-mono block">UPTIME TIMESTAMP</span>
            <span class="text-xs font-mono text-slate-300 block truncate" title="${data.timestamp || new Date().toISOString()}">${new Date().toLocaleTimeString()} (Active)</span>
          </div>
        </div>
      </div>

      <!-- Endpoints Explorer -->
      <div class="glass rounded-2xl p-6 sm:p-8 shadow-xl">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="text-lg font-bold text-white">Active API Endpoints</h3>
            <p class="text-xs text-slate-400">Click any endpoint to test response in real-time</p>
          </div>
          <a href="?format=json" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 border border-slate-700 transition-colors">
            { } View Raw JSON
          </a>
        </div>

        <div class="space-y-3 font-mono text-xs">
          <!-- Endpoint Item -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors gap-3">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-[11px]">GET</span>
              <span class="text-slate-200 font-semibold">/api/health</span>
              <span class="text-slate-500 text-[11px] font-sans hidden sm:inline">- Health & status check</span>
            </div>
            <a href="/api/health?format=json" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-center transition-colors">Test Endpoint &rarr;</a>
          </div>

          <!-- Endpoint Item -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors gap-3">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-[11px]">GET</span>
              <span class="text-slate-200 font-semibold">/api/recruitment/jobs</span>
              <span class="text-slate-500 text-[11px] font-sans hidden sm:inline">- Available career openings</span>
            </div>
            <a href="/api/recruitment/jobs" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-center transition-colors">Test Endpoint &rarr;</a>
          </div>

          <!-- Endpoint Item -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors gap-3">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-[11px]">GET</span>
              <span class="text-slate-200 font-semibold">/api/recruitment/applications</span>
              <span class="text-slate-500 text-[11px] font-sans hidden sm:inline">- Candidate applications ledger</span>
            </div>
            <a href="/api/recruitment/applications" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-center transition-colors">Test Endpoint &rarr;</a>
          </div>

          <!-- Endpoint Item -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors gap-3">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-[11px]">GET</span>
              <span class="text-slate-200 font-semibold">/api/leads</span>
              <span class="text-slate-500 text-[11px] font-sans hidden sm:inline">- Inquiries & client leads</span>
            </div>
            <a href="/api/leads" class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 text-center transition-colors">Test Endpoint &rarr;</a>
          </div>

          <!-- Endpoint Item -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors gap-3">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 font-bold text-[11px]">POST</span>
              <span class="text-slate-200 font-semibold">/api/submit-contact</span>
              <span class="text-slate-500 text-[11px] font-sans hidden sm:inline">- Submit client inquiry</span>
            </div>
            <span class="px-3 py-1 rounded-lg bg-slate-800/40 text-slate-500 text-center">Payload Required</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-8 py-4 text-center text-xs text-slate-500">
      &copy; 2026 SkilloraPath AI. All rights reserved. &bull; Enterprise Cloud API
    </footer>
  </div>

</body>
</html>`;
}
