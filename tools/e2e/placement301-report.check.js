(async()=>{ const w=ms=>new Promise(r=>setTimeout(r,ms)); localStorage.setItem('itqan_tour173','1'); document.querySelectorAll('[class*=tour]').forEach(e=>e.remove());
 state.auth={ready:true,user:{id:'u1',email:'a@b.c'},profile:{id:'u1',role:'owner',full_name:'T',lang_plan:{}}};
 go16('lang','fu'); await w(800); laPlacement('fu'); await w(400); const out={view:state.view||state.route||null, hasQ:!!state.qz, n:state.qz&&state.qz.qs.length};
 out.txt0=document.body.innerText.slice(0,120);
 const z=state.qz; z.i=z.qs.length; z.qs.forEach((q,k)=>{}); 
 // simulate answers: right for units<9
 z.res=[]; z.qs.forEach((q,k)=>{ z.res[k]= q.u<9; }); z.n0=z.n0||z.qs.length; z.qs.forEach((q,k)=>q._o=k);
 render(); await w(700); out.fin=z.fin; out.lvl=z.lvl301; out.report=/تقرير مستواك/.test(document.body.innerText); out.txt=(document.body.innerText.match(/ابدأ من الوحدة[^\n]*/)||[''])[0];
 return out; })()
