# يبني مسودات دروس الاستماع/الحوار من ملفات pptx: صورة النص (OCR مسودة) + تقسيم الصوت عند السكتات
import sys, os, re, json, glob, subprocess
from pptx import Presentation
from pptx.util import Emu
SRC='/mnt/user-data/uploads/Downloads/Arabya pptx'
MED='/home/claude/mediarepo/abyb'
OUT='/home/claude/ce/abyb'; os.makedirs(OUT,exist_ok=True); os.makedirs('/home/claude/ce/img',exist_ok=True)
LV={'الثاني':'L2','الثالث':'L3','الرابع':'L4','الأول':'L1'}
HAR=re.compile(r'[ً-ْٰـ]')
def silences(mp3):
    o=subprocess.run(['ffmpeg','-hide_banner','-i',mp3,'-af','silencedetect=noise=-35dB:d=0.3','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',o)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',o)]
    d=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout.strip() or 0)
    return list(zip(st,en[:len(st)]+[d]*(len(st)-len(en)))), d
def segments(mp3, n):
    S,d=silences(mp3)
    if not d: return []
    lead = S[0][1] if S and S[0][0]<0.05 else 0
    tail = S[-1][0] if S and S[-1][1]>=d-0.05 else d
    inner=[s for s in S if s[0]>lead+0.2 and s[1]<tail-0.2]
    cuts=sorted(sorted(inner,key=lambda s:-(s[1]-s[0]))[:max(0,n-1)])
    segs=[]; cur=lead
    for a,b in cuts: segs.append([round(cur,2),round(a+0.12,2)]); cur=b-0.12
    segs.append([round(cur,2),round(tail+0.1,2)])
    return segs
def ocr(path):
    subprocess.run(['convert',path,'-resize','220%','-colorspace','Gray','-normalize','/tmp/o.png'])
    t=subprocess.run(['tesseract','/tmp/o.png','-','-l','ara','--psm','6'],capture_output=True,text=True).stdout
    L=[]
    for ln in t.split('\n'):
        ln=ln.strip()
        if len(HAR.sub('',ln))<3: continue
        L.append(ln)
    return L
idx={}
for f in sorted(glob.glob(SRC+'/*/U*.pptx')):
    lv=[v for k,v in LV.items() if k in f][0]; u=os.path.basename(f)[:-5]; uid=lv+u
    if not os.path.isdir(f'{MED}/{uid}'): continue
    p=Presentation(f); meta=json.load(open(f'{MED}/{uid}/meta.json'))
    lessons=[]
    for i,s in enumerate(p.slides,1):
        if not os.path.exists(f'{MED}/{uid}/{i}.mp3'): continue
        texts=[sh.text_frame.text for sh in s.shapes if sh.has_text_frame]
        m=re.search(r'الدَّرْسُ\s*\(\s*(\d+)\s*\)',' '.join(texts)); ln=int(m.group(1)) if m else 0
        pics=[sh for sh in s.shapes if sh.shape_type==13 and sh.image.size[0]*sh.image.size[1]>300000]
        lines=[]; img=None
        if pics:
            # أكبر صورة فيها كلام (مش الخلفية اللي بعرض الشريحة كلها)
            pics=[x for x in pics if x.width < p.slide_width*0.98] or pics
            big=max(pics,key=lambda x:x.width*x.height); img=f'/home/claude/ce/img/{uid}_{i}.{big.image.ext}'; open(img,'wb').write(big.image.blob)
            lines=ocr(img)
        segs=segments(f'{MED}/{uid}/{i}.mp3', max(1,len(lines)))
        lessons.append({'id':f'{uid}-s{i}','slide':i,'lesson':ln,'audio':f'{uid}/{i}.mp3','img':f'{uid}/a{i}.jpg','status':'draft','ocr':lines,'segs':segs})
    json.dump({'id':uid,'title':meta.get('title') or '', 'items':lessons},open(f'{OUT}/{uid}.json','w'),ensure_ascii=False)
    idx[uid]=len(lessons); print(uid,len(lessons),[len(x['ocr']) for x in lessons],flush=True)
json.dump(idx,open(f'{OUT}/_counts.json','w'))
