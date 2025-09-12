// Minimal JS: ripple effect + demo actions
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function addRipple(e){
  if(prefersReduced) return;
  const target = e.currentTarget;
  const rect = target.getBoundingClientRect();
  const r = document.createElement('span');
  r.className = 'ripple';
  r.style.left = (e.clientX - rect.left) + 'px';
  r.style.top  = (e.clientY - rect.top) + 'px';
  target.appendChild(r);
  r.addEventListener('animationend', ()=> r.remove(), {once:true});
}

// Attach ripple to interactive elements
document.querySelectorAll('.item, .cta').forEach(el=>{
  el.addEventListener('click', addRipple);
  el.addEventListener('touchstart', (e)=>{
    if(!e.touches?.[0]) return;
    const t = e.touches[0];
    addRipple({ currentTarget: el, clientX: t.clientX, clientY: t.clientY });
  }, {passive:true});
});

// Booking button handler
document.getElementById('bookBtn').addEventListener('click', ()=>{
  // Open Telegram
  window.open('https://t.me/zhenshen14', '_blank');
});

// Menu items now use real navigation (no preventDefault)
document.querySelectorAll('.item').forEach(a=>{
  a.addEventListener('click', (e)=>{
    // Let the default link behavior work
    console.log(`Navigating to: ${a.dataset.name}`);
  });
});

function showToast(text){
  let toast = document.getElementById('toast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'toast';
    Object.assign(toast.style, {
      position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
      background:'rgba(255,255,255,.06)', color:'#fff',
      border:'1px solid #2a2a2a', padding:'12px 16px', borderRadius:'12px',
      boxShadow:'0 8px 28px rgba(0,0,0,.5)', backdropFilter:'blur(8px)',
      fontSize:'14px', zIndex:999
    });
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.style.opacity = '1';
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=> toast.style.opacity = '0', 1200);
}