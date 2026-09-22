/** Decorative, locally rendered illustration; not a photograph of the township. */
export default function CommunityScene() {
  return <div className="community-scene" aria-hidden="true">
    <svg viewBox="0 0 600 560" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="sky" x2="0" y2="560" gradientUnits="userSpaceOnUse"><stop stopColor="#f7f0ef"/><stop offset="1" stopColor="#fffcfa"/></linearGradient><linearGradient id="land" x2="600" y2="560" gradientUnits="userSpaceOnUse"><stop stopColor="#d9ddd2"/><stop offset="1" stopColor="#adbba9"/></linearGradient></defs>
      <path fill="url(#sky)" d="M0 0h600v560H0z"/><circle cx="432" cy="111" r="53" fill="#eed6c7"/>
      <path d="M0 320Q180 250 315 305T600 274V560H0" fill="#e6e4dc"/>
      <path d="M0 407Q260 297 600 382V560H0" fill="url(#land)"/>
      <path d="M380 342Q189 415 355 560H486Q280 428 408 348" fill="#f5e8df"/>
      <g stroke="#405d48" strokeWidth="3" strokeLinejoin="round"><path d="M74 263h145v124H74z" fill="#f5efdd"/><path d="m58 266 88-65 90 65z" fill="#a43146"/><path d="M94 292h29v36H94zm66 0h29v36h-29z" fill="#8baaa0"/><path d="M130 341h32v46h-32z" fill="#507761"/>
      <path d="M330 267h121v97H330z" fill="#e8e4ce"/><path d="m317 269 72-59 76 59z" fill="#823043"/><path d="M345 288h26v29h-26zm58 0h26v29h-26z" fill="#a7bcb0"/><path d="M376 325h27v39h-27z" fill="#aa704f"/></g>
      <g fill="#788675"><ellipse cx="45" cy="290" rx="51" ry="78"/><ellipse cx="270" cy="249" rx="46" ry="85"/><ellipse cx="540" cy="298" rx="65" ry="103"/></g>
      <g stroke="#d0d6b6" strokeWidth="4" strokeLinecap="round"><path d="M45 406V275m0 54-24-24m24 51 25-26M270 376V222m0 76-20-25m20 54 22-24M540 447V260m0 70-29-30m29 69 30-33"/></g>
      <g stroke="#355841" strokeWidth="4" strokeLinecap="round"><path d="M85 452h96m-96 12h96m-87-26v43m78-43v43"/></g>
      <g><circle cx="331" cy="407" r="10" fill="#875936"/><path d="M319 425q12-10 24 0l5 34h-33z" fill="#b75d6d"/><path d="m321 459-3 29m22-29 4 29" stroke="#304f3c" strokeWidth="6" strokeLinecap="round"/><circle cx="365" cy="417" r="8" fill="#ad7552"/><path d="M355 431q10-8 20 0l4 27h-27z" fill="#f0e8d5"/><path d="m359 458-3 24m15-24 3 24" stroke="#304f3c" strokeWidth="5" strokeLinecap="round"/></g>
      <g fill="#fcf4ec"><circle cx="56" cy="499" r="4"/><circle cx="203" cy="456" r="4"/><circle cx="506" cy="501" r="4"/><circle cx="527" cy="475" r="3"/><circle cx="223" cy="498" r="3"/></g>
      <path d="m228 108 9-4 10 4m-49 28 8-4 8 4" stroke="#58735a" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    <div className="scene-label"><span className="status-dot"/> Rooted in community.</div>
  </div>;
}
