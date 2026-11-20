# usage: abyb.py <pptx> <outdir> <tag>   -> outdir/<tag>/{q-N.jpg,a-N.jpg,N.mp3,meta.json}
import sys,os,re,zipfile,subprocess,shutil,json,glob,tempfile
src,out,tag=sys.argv[1],sys.argv[2],sys.argv[3]
D=os.path.join(out,tag); os.makedirs(D,exist_ok=True)
tmp=tempfile.mkdtemp(); z=zipfile.ZipFile(src)
names=z.namelist(); slides=sorted([n for n in names if re.match(r'ppt/slides/slide\d+\.xml$',n)],key=lambda n:int(re.findall(r'\d+',n)[-1]))
texts=[];audio={}
def strip_anim(x):
    ids=set(re.findall(r'<p:spTgt spid="(\d+)"',x))
    if not ids: return x,0
    def kill(m):
        blk=m.group(0); i=re.search(r'<p:cNvPr id="(\d+)"',blk)
        return '' if i and i.group(1) in ids else blk
    y=re.sub(r'<p:sp>.*?</p:sp>',kill,x,flags=re.S)
    y=re.sub(r'<p:pic>.*?</p:pic>',kill,y,flags=re.S)
    y=re.sub(r'<p:timing>.*?</p:timing>','',y,flags=re.S)
    return y,len(ids)
qz=os.path.join(tmp,'q.pptx'); zq=zipfile.ZipFile(qz,'w',zipfile.ZIP_DEFLATED); has=[]
for n in names:
    b=z.read(n)
    if n in slides:
        x=b.decode('utf-8'); y,k=strip_anim(x); has.append(k>0); b=y.encode('utf-8')
        texts.append(' | '.join(s for s in re.findall(r'<a:t>([^<]*)</a:t>',x) if s.strip()))
    if n.startswith('ppt/media/') and re.search(r'\.(mp3|wav|m4a|wma)$',n): b=b''  # audio not needed for render
    zq.writestr(n,b)
zq.close()
for i,n in enumerate(slides,1):
    r='ppt/slides/_rels/'+n.split('/')[-1]+'.rels'
    if r in names:
        m=re.findall(r'Target="\.\./media/([^"]+\.(?:mp3|wav|m4a|wma))"',z.read(r).decode('utf-8'))
        if m: audio[i]=m[0]
def topdf(p,name):
    d=os.path.join(tmp,name); os.makedirs(d,exist_ok=True); shutil.copy(p,os.path.join(d,'x.pptx'))
    subprocess.run(['soffice','--headless','--convert-to','pdf','--outdir',d,os.path.join(d,'x.pptx')],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,timeout=900)
    return os.path.join(d,'x.pdf')
pa=topdf(src,'a'); pq=topdf(qz,'q')
for p,pre in ((pa,'a'),(pq,'q')):
    subprocess.run(['pdftoppm','-r','96','-jpeg','-jpegopt','quality=72',p,os.path.join(D,pre)],check=True)
for f in glob.glob(os.path.join(D,'*.jpg')):
    m=re.match(r'([aq])-0*(\d+)\.jpg$',os.path.basename(f)); os.rename(f,os.path.join(D,f'{m.group(1)}{int(m.group(2))}.jpg'))
for i,k in enumerate(has,1):
    if not k:
        q=os.path.join(D,f'q{i}.jpg')
        if os.path.exists(q): os.remove(q)
for i,a in audio.items():
    raw=os.path.join(tmp,a); open(raw,'wb').write(z.read('ppt/media/'+a))
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',raw,'-ac','1','-b:a','32k',os.path.join(D,f'{i}.mp3')],check=True)
json.dump({'n':len(slides),'ans':[i for i,k in enumerate(has,1) if k],'audio':sorted(audio),'t':texts},open(os.path.join(D,'meta.json'),'w'),ensure_ascii=False)
shutil.rmtree(tmp); print(tag,len(slides),'slides',len(audio),'audio',sum(has),'answer-slides')
