document.querySelector('.hamb')?.addEventListener('click',()=>{const n=document.querySelector('.navlinks');let v=n.classList.toggle('open');document.querySelector('.hamb').setAttribute('aria-expanded',String(v))});document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('[data-tags]').forEach(x=>x.classList.toggle('hide',b.dataset.filter!=='all'&&!x.dataset.tags.includes(b.dataset.filter)))}));
// Scroll-linked perception gap animation, with reduced-motion support.
(()=>{const diagram=document.querySelector('.hero-orbs');if(!diagram||matchMedia('(prefers-reduced-motion: reduce)').matches)return;let ticking=false;function update(){const bounds=diagram.getBoundingClientRect();const distance=Math.max(1,innerHeight+bounds.height);const progress=Math.max(0,Math.min(1,(innerHeight-bounds.top)/distance));diagram.style.setProperty('--orb-progress',progress.toFixed(3));ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});addEventListener('resize',update);update()})();

// Contact: ?service=<diagnosis|identity|strategy|activation> preselects the topic and puts the cursor in the form.
(()=>{const form=document.querySelector('form#enquiry');if(!form)return;const want=new URLSearchParams(location.search).get('service');const sel=form.querySelector('select[name=topic]');if(!want||!sel||![...sel.options].some(o=>o.value===want))return;sel.value=want;form.scrollIntoView({block:'start'});form.querySelector('input[name=name]')?.focus({preventScroll:true})})();

// Contact form: sends in-page via FormSubmit (no mail app). Inline errors, sending/success/failure states.
(()=>{const form=document.querySelector('form#enquiry[data-endpoint]');if(!form)return;
const btn=form.querySelector('button[type=submit]'),status=form.querySelector('.form-status'),label=btn.textContent;
const msgs={name:'Please enter your name.',email:'Please enter a valid email address.',message:'Please tell us a little about your challenge.'};
const check=el=>{const err=el.parentElement.querySelector('.field-error');const bad=!el.value.trim()||(el.type==='email'&&!el.checkValidity());el.setAttribute('aria-invalid',bad);if(err)err.textContent=bad?msgs[el.name]:'';return !bad};
const fields=[...form.querySelectorAll('input[required],textarea[required]')];
fields.forEach(el=>el.addEventListener('blur',()=>check(el)));fields.forEach(el=>el.addEventListener('input',()=>{if(el.getAttribute('aria-invalid')==='true')check(el)}));
form.addEventListener('submit',async e=>{e.preventDefault();const ok=fields.map(check).every(Boolean);if(!ok){form.querySelector('[aria-invalid=true]')?.focus();return}
if(form._honey.value)return;
const topic=form.topic.selectedOptions[0].text;
const data={name:form.name.value.trim(),email:form.email.value.trim(),topic,message:form.message.value.trim(),_subject:'HALO enquiry: '+topic,_replyto:form.email.value.trim(),_template:'table',_captcha:'false'};
btn.disabled=true;btn.textContent='Sending…';status.className='form-status';status.textContent='';
try{const r=await fetch(form.dataset.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)});const j=await r.json().catch(()=>({}));
if(!r.ok||j.success===false||j.success==='false'){console.warn('[HALO form]',r.status,j.message||j);throw new Error(j.message||'failed')}
const [u,dom]=data.email.split('@'),masked=u[0]+'•••@'+dom; // show only enough of the address to recognise it
const done=document.createElement('div');done.className='form-done';done.tabIndex=-1;done.setAttribute('role','status');done.setAttribute('aria-labelledby','form-done-title');
done.innerHTML='<div class="form-done-head"><span class="form-done-icon" aria-hidden="true">✓</span><span class="eyebrow">Enquiry received</span></div><h3 id="form-done-title">Thank you for getting in touch.</h3><p class="form-done-next"></p><div class="form-done-foot"><span>HALO Branding</span><span>Clarity begins here.</span></div>';
done.querySelector('.form-done-next').textContent='We\u2019ll reply to '+masked+' within two working days.';
form.closest('.split')?.querySelector('.notice')?.remove();window.gtag&&gtag('event','generate_lead',{form:'contact',topic});form.replaceWith(done);done.focus({preventScroll:true});done.scrollIntoView({block:'center',behavior:'smooth'});}
catch(err){status.classList.add('is-error');if(location.protocol==='file:'){status.textContent='The form only sends from the live website (halogbs.com), not from a file opened on this computer.';return}if(/activat/i.test(err.message)){status.textContent='Form not activated yet: please confirm the activation email sent to gina.ha@halogbs.com, then try again.';return}status.innerHTML='Sorry, your enquiry could not be sent. Please try again, or email <a href="mailto:gina.ha@halogbs.com">gina.ha@halogbs.com</a>.';}
finally{btn.disabled=false;btn.textContent=label}});})();

// Clients strip: duplicate logos so the mobile loop is seamless (clones hidden on desktop by CSS).
(()=>{const row=document.querySelector('.brandstrip .logos');if(!row)return;[...row.children].forEach(el=>{const c=el.cloneNode(true);c.classList.add('is-clone');c.setAttribute('aria-hidden','true');row.appendChild(c)})})();

// Analytics consent: Cloudflare (cookieless) always runs; Google Analytics loads only after "Accept".
(()=>{const GA='G-J9VSN1X265',KEY='halo-consent';
const get=()=>{try{return localStorage.getItem(KEY)}catch(e){return null}},set=v=>{try{localStorage.setItem(KEY,v)}catch(e){}};
const loadGA=()=>{if(window.__haloGA)return;window.__haloGA=1;window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',GA);const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA;document.head.appendChild(s)};
const clearGA=()=>document.cookie.split(';').map(c=>c.split('=')[0].trim()).filter(n=>/^_ga/.test(n)).forEach(n=>{['', '.halogbs.com','.www.halogbs.com'].forEach(d=>document.cookie=n+'=; Max-Age=0; path=/'+(d?'; domain='+d:''))});
const show=()=>{if(document.querySelector('.consent'))return;const b=document.createElement('div');b.className='consent';b.setAttribute('role','dialog');b.setAttribute('aria-label','Analytics cookies');
b.innerHTML='<p>We use Google Analytics cookies to understand how visitors use this site, only if you allow it. <a href="/privacy.html#cookies">Privacy</a></p><div class="consent-actions"><button type="button" class="button ghost" data-c="no">Reject</button><button type="button" class="button" data-c="yes">Accept</button></div>';
b.addEventListener('click',e=>{const c=e.target.dataset&&e.target.dataset.c;if(!c)return;const was=get();set(c);b.remove();if(c==='yes')loadGA();else if(was==='yes'){clearGA();location.reload()}});document.body.appendChild(b)};
document.addEventListener('click',e=>{if(e.target.closest('[data-cookie-settings]')){e.preventDefault();show()}});
const c=get();if(c==='yes')loadGA();else if(!c)show();})();

(function(){var p=location.pathname.split('/').pop()||'index.html',d=location.pathname.indexOf('/post/')>-1;var t=d?'insights.html':/^case-/.test(p)?'cases.html':p;document.querySelectorAll('.navlinks a:not(.button)').forEach(function(a){if((a.getAttribute('href')||'').split('/').pop()===t)a.setAttribute('aria-current','page')})})();
