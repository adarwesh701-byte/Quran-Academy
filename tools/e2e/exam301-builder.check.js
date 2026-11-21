(async()=>{ const w=ms=>new Promise(r=>setTimeout(r,ms)); go16('exam301'); await w(2500);
 const S=v301.S; const out={route:state.route, tree:(S.tree||[]).map(n=>({id:n.id,kids:(n.kids||[]).length})), leaves:Object.keys(S.leaves).length, withQs:Object.values(S.leaves).filter(l=>l.n>0).map(l=>l.id+':'+l.n), total:Object.values(S.leaves).reduce((s,l)=>s+l.n,0)};
 out.text=(document.getElementById('ex301')||{}).innerText.slice(0,500); return out; })()
