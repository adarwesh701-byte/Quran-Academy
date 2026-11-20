# يبني ملفات المنهج من: مسودات ce_build (صوت + OCR) + النسخ اليدوي المراجع في /home/claude/ce/hand/<uid>-<slide>.json
import json,os,glob,sys,re
sys.path.insert(0,'/home/claude/tools'); import align as A; align=A.align
MED='/home/claude/mediarepo/abyb'; OUT='/home/claude/mediarepo/ce/abyb'; HD='/home/claude/ce/hand'; os.makedirs(OUT,exist_ok=True)
IDX=json.load(open(MED+'/index.json'))
HAR=re.compile(r'[ً-ْٰـ]')
def lesson_no(t):
    m=re.search(r'الدرس\s*\|?\s*\(\s*(\d+)',HAR.sub('',t or ''))
    return int(m.group(1)) if m else 0
units={}
for f in sorted(glob.glob('/home/claude/ce/abyb/L*.json')):
    d=json.load(open(f)); uid=d['id']
    if not d['items']: continue
    meta=json.load(open(f'{MED}/{uid}/meta.json')); T=meta.get('t') or []; L=[]
    for it in d['items']:
        sl=it['slide']; base={'id':f"{uid}-s{sl}",'n':lesson_no(T[sl-1] if sl-1<len(T) else ''),'slide':sl,'audio':it['audio'],'img':it['img']}
        hf=f'{HD}/{uid}-{sl}.json'
        if os.path.exists(hf):
            h=json.load(open(hf)); base.update(kind=h['kind'],title=h['title'],status='ok')
            if h.get('pre'): base['pre']=h['pre']
            if h.get('ins'): base['ins']=h['ins']
            if h.get('quiz'): base['quiz']=h['quiz']
            rows=h.get('rows') or []
            if rows:
                segs,_=align(f"{MED}/{it['audio']}",[t for _,t in rows])
                base['aq']=round(A.align.q,2)
                base['lines']=[{'id':f"{base['id']}-{i}",'sp':sp,'t':t,'s':s[0],'e':s[1]} for i,((sp,t),s) in enumerate(zip(rows,segs))]
            else: base['lines']=[]
        else:
            base.update(kind='audio',title='',status='draft',lines=[{'id':f"{base['id']}-{i}",'sp':'','t':'','s':s[0],'e':s[1],'ocr':(it['ocr'][i] if i<len(it['ocr']) else '')} for i,s in enumerate(it['segs'])])
        L.append(base)
    json.dump({'id':uid,'lessons':L},open(f'{OUT}/{uid}.json','w'),ensure_ascii=False)
    tt=next((u.get('title') for u in IDX.get(uid[:2],[]) if u.get('tag')==uid),'')
    units[uid]={'n':len(L),'ok':sum(1 for x in L if x['status']=='ok'),'t':tt}
json.dump({'v':2,'units':units},open(f'{OUT}/index.json','w'),ensure_ascii=False)
print(len(units), {k:v['ok'] for k,v in units.items() if v['ok']})
