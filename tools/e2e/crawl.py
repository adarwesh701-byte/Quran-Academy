import sys, asyncio, json, re
from playwright.async_api import async_playwright
root=sys.argv[1]; out=sys.argv[2]
html=open(root+'/index.html',encoding='utf-8').read()
stub=open(root+'/tools/release/stub.js').read()
enn=open(root+'/en_natural.json',encoding='utf-8').read()
JS=r'''async ([lang]) => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  state.lang = lang; try { document.documentElement.setAttribute('dir', lang==='ar'?'rtl':'ltr'); } catch(e){}
  let routes = [];
  try { routes = (typeof PAGES16!=='undefined'?PAGES16:[]).concat(typeof HASH_ROUTES!=='undefined'?HASH_ROUTES:[]); } catch(e){}
  routes = [...new Set(routes)].filter(r => !['pay','cert','verify','track-detail'].includes(r));
  const res = [];
  for (const r of routes) {
    const before = window.__errs.length;
    try { state.qz = null; if ((typeof PAGES16!=='undefined') && PAGES16.includes(r)) go16(r); else navigate(r); } catch (e) { window.__errs.push('nav '+r+': '+e.message); }
    await wait(250);
    const app = document.getElementById('app'); const txt = (app && app.innerText) || '';
    const main = txt.replace(/\s+/g,' ').trim();
    res.push({ r, len: main.length, errs: window.__errs.slice(before).slice(0,3), dia: (main.match(/(?<![ء-ي])(مش|دلوقتي|عشان|إزاي|اللي|عايز|مفيش|لسه|دوس|ده|دي)(?![ء-ي])/g)||[]).length, hscroll: document.documentElement.scrollWidth > innerWidth + 2 });
  }
  return res;
}'''
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    allr={}
    for W,H,dev in [(1280,900,'desktop'),(390,844,'mobile')]:
      for lang in ['ar','en']:
        pg=await b.new_page(viewport={'width':W,'height':H})
        await pg.add_init_script("window.__errs=[];window.addEventListener('error',e=>window.__errs.push(String(e.message).slice(0,200)));window.addEventListener('unhandledrejection',e=>window.__errs.push('rej:'+String(e.reason&&e.reason.message||e.reason).slice(0,200)));")
        cons=[]; pg.on('console', lambda m: m.type=='error' and cons.append(m.text[:160]))
        async def route(r):
          u=r.request.url
          if u.startswith('https://itqan.test/en_natural.json'): return await r.fulfill(body=enn, content_type='application/json')
          if u.startswith('https://itqan.test/'): return await r.fulfill(body=html, content_type='text/html')
          if 'supabase-js' in u: return await r.fulfill(body=stub, content_type='application/javascript')
          return await r.abort()
        await pg.route('**/*', route)
        await pg.goto('https://itqan.test/', wait_until='domcontentloaded'); await pg.wait_for_timeout(2500)
        res=await pg.evaluate(JS,[lang])
        await pg.evaluate('go16("balagha")'); await pg.wait_for_timeout(300)
        await pg.screenshot(path=f'{out}/balagha-{dev}-{lang}.png', full_page=False)
        allr[f'{dev}-{lang}']={'routes':res,'console':[c for c in cons if 'ERR_FAILED' not in c and 'net::' not in c][:15]}
        await pg.close()
    await b.close()
    json.dump(allr,open(f'{out}/crawl.json','w'),ensure_ascii=False,indent=1)
    for k,v in allr.items():
      R=v['routes']; e=[x for x in R if x['errs']]; empty=[x['r'] for x in R if x['len']<40]
      print(k,'routes',len(R),'withErrors',len(e),'empty',empty[:8],'hscroll',[x['r'] for x in R if x['hscroll']][:6],'dialectTotal',sum(x['dia'] for x in R),'console',len(v['console']))
      for x in e[:6]: print('   ',x['r'],x['errs'])
asyncio.run(main())
