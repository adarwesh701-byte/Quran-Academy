import sys, asyncio, json
from playwright.async_api import async_playwright
# usage: run.py <blocks comma> <script.js> [w h]
blocks=[b for b in sys.argv[1].split(',') if b]; script=open(sys.argv[2]).read(); W=int(sys.argv[3]) if len(sys.argv)>3 else 1280; H=int(sys.argv[4]) if len(sys.argv)>4 else 900
html=open('/home/claude/quran-academy/index.html',encoding='utf-8').read()
stub=open('/home/claude/quran-academy/tools/release/stub.js').read()
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':W,'height':H})
    errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)[:300]+' @@ '+str(getattr(e,'stack',''))[:400])); pg.on('console', lambda m: m.type=='error' and errs.append('console:'+m.text[:200]))
    async def route(r):
      u=r.request.url
      if u.startswith('https://itqan.test/'): return await r.fulfill(body=html, content_type='text/html')
      if 'supabase-js' in u: return await r.fulfill(body=stub, content_type='application/javascript')
      return await r.abort()
    await pg.route('**/*', route)
    await pg.goto('https://itqan.test/', wait_until='domcontentloaded'); await pg.wait_for_timeout(2500)
    for bl in blocks:
      try: await pg.evaluate(open('/home/claude/'+bl).read())
      except Exception as e: errs.append('BLOCK '+bl+': '+str(e)[:300])
    try: out=await pg.evaluate(script)
    except Exception as e: out='SCRIPT ERR '+str(e)[:500]
    await pg.screenshot(path='/home/claude/w/h/shot.png', full_page=False)
    print(json.dumps(out,ensure_ascii=False,indent=1)[:6000]); print('ERRORS:', errs[:15])
    await b.close()
asyncio.run(main())
