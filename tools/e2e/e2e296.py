import sys, asyncio, json
from playwright.async_api import async_playwright
root=sys.argv[1]; shots=sys.argv[2]
html=open(root+'/index.html',encoding='utf-8').read()
stub=open(root+'/tools/release/stub.js').read()
T=r'''async () => {
 const R = {};
 const wait = ms => new Promise(r => setTimeout(r, ms));
 state.settings = Object.assign({}, state.settings || {}, {
   currency: "USD", sitePlans: [{id:"site_m", ar:"شهري", en:"Monthly", price: 20},{id:"site_y", ar:"سنوي", en:"Yearly", price: 150}],
   secsub196: {disc2: 10, price: {}}, sectionAccess: {days: 30},
   plans296: {trial: {on: true}} });
 state.data.sections = [
   {id:"s-maq", title:{ar:"المقامات", en:"Maqamat"}, price: 12},
   {id:"s-ar", title:{ar:"اللغة العربية", en:"Arabic"}, price: 10},
   {id:"s-taj", title:{ar:"التجويد", en:"Tajweed"}, price: 0},
   {id:"s-x", title:{ar:"قسم فرعي"}, price: 5, parent_id:"s-ar"}];
state.data.cnt221 = [{section_id:"s-maq",n:3},{section_id:"s-ar",n:4},{section_id:"s-taj",n:2}];
 go16("subscribe"); await wait(400); R.dbgSecs = JSON.stringify(state.data.sections).slice(0,200); R.dbgType = typeof sectionsData === "function" ? JSON.stringify(sectionsData()).slice(0,120) : "nofn";
 const app = document.getElementById("app");
 R.route = state.route; R.url = location.pathname + location.hash;
 R.cards = app.querySelectorAll(".pl296c").length;
 R.cardTitles = [...app.querySelectorAll(".pl296c .pl296h b")].map(x => x.textContent);
 R.prices = [...app.querySelectorAll(".pl296c .pl296p")].map(x => x.textContent.trim());
 R.subscribeBtns = [...app.querySelectorAll(".pl296c button")].map(x => x.textContent.trim());
 R.tajweedNotForSale = /مش معروض للبيع لوحده/.test(app.innerHTML);
 R.compareRows = app.querySelectorAll(".pl296t > i").length;
 R.trialShownToGuest = !!app.querySelector(".pl296tr");
 // logged-in student who used the free hour, flag on, server not ready -> card shown, no start button
 state.auth.user = {id:"u1"}; state.auth.profile = {id:"u1", role:"student"}; state.data.fpS = [{hour_used:true, hour_ends:"2020-01-01T00:00:00Z"}]; render(); await wait(150);
 R.trialShownAfterHour = !!app.querySelector(".pl296tr"); R.trialStartBtnWhenServerOff = /ابدأ تجربتك|Start your free trial/.test((app.querySelector(".pl296tr")||{}).innerHTML||"");
 state.data.fpS = [{hour_used:false}]; render(); await wait(150); R.trialHiddenBeforeHour = !app.querySelector(".pl296tr");
 state.auth.user = null; state.auth.profile = null; delete state.data.fpS; render(); await wait(150);
 R.noOwnerControlsForGuest = app.querySelectorAll(".pl296own").length === 0;
 // pause a plan: hidden for non-owner
 state.settings.plans296.off = { maqamat: true }; render(); await wait(150);
 R.pausedHidden = app.querySelectorAll(".pl296c").length === 3;
 state.settings.plans296.off = {}; 
 // question guard
 state.qz = { qs: [
   { q: "q1", ans: "كتاب", opts: ["كتاب", "قلم", "كتاب ", "بيت"], t: "" },
   { q: "q2-bad", ans: "X", opts: ["a", "b", "c"], t: "" },
   { q: "q3", ans: "نورٌ", opts: ["نورٌ", "نورًا", "نورٍ"], t: "" } ], i: 0, ok: 0, pick: null, back(){} };
 const v1 = quizView();
 R.q1Opts = state.qz.qs[0].opts;
 state.qz.i = 1; const v2 = quizView();
 R.afterDropLen = state.qz.qs.length; R.q2now = state.qz.qs[1].q;
 R.q3OptsKeepDiacritics = state.qz.qs[1].opts.length;
 R.qg = { checked: qg296.checked, fixed: qg296.fixed, dropped: qg296.dropped };
 state.qz = null;
 // pricing link injected once, idempotent
 navigate("pricing"); await wait(300); render(); await wait(100); render(); await wait(100);
 R.pricingLinkCount = document.querySelectorAll("#pl296link").length;
 // pretty URL roundtrip
 R.pretty = window.url288 ? url288.toPretty("#/subscribe") : null;
 R.fromPath = window.url288 ? url288.fromPath("/Subscribe") : null;
 R.ver = UI_VERSION;
 return R;
}'''
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    out={}
    for W,H,name in [(1280,900,'desktop'),(390,844,'mobile')]:
      pg=await b.new_page(viewport={'width':W,'height':H})
      errs=[]; pg.on('pageerror', lambda e: errs.append(str(e)[:300]))
      async def route(r):
        u=r.request.url
        if u.startswith('https://itqan.test/'): return await r.fulfill(body=html, content_type='text/html')
        if 'supabase-js' in u: return await r.fulfill(body=stub, content_type='application/javascript')
        return await r.abort()
      await pg.route('**/*', route)
      await pg.goto('https://itqan.test/', wait_until='domcontentloaded'); await pg.wait_for_timeout(3000)
      try: res=await pg.evaluate(T)
      except Exception as e: res='ERR '+str(e)[:400]
      if name=='mobile':
        await pg.evaluate('go16("subscribe")'); await pg.wait_for_timeout(400)
        res['hScroll']=await pg.evaluate('document.documentElement.scrollWidth > innerWidth + 2')
      else:
        await pg.evaluate('go16("subscribe")'); await pg.wait_for_timeout(400)
      await pg.screenshot(path=f'{shots}/subscribe-{name}.png', full_page=True)
      res['pageErrors']=errs[:10]; out[name]=res
      await pg.close()
    await b.close()
    print(json.dumps(out,ensure_ascii=False,indent=1))
asyncio.run(main())
