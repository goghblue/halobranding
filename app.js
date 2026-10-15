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
if(!r.ok||j.success===false||j.success==='false')throw new Error(j.message||'failed');
form.reset();status.classList.add('is-success');status.textContent='Thank you. Your enquiry has been sent. We will reply to '+data.email+' within two working days.';}
catch(err){status.classList.add('is-error');status.innerHTML='Sorry, your enquiry could not be sent. Please try again, or email <a href="mailto:gina.ha@halogbs.com">gina.ha@halogbs.com</a>.';}
finally{btn.disabled=false;btn.textContent=label}});})();
