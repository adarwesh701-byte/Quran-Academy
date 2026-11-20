import re,subprocess,json,sys
H=re.compile(r'[ً-ْٰـ]')
def chunks(mp3,db=-35,d=0.25):
    o=subprocess.run(['ffmpeg','-hide_banner','-i',mp3,'-af',f'silencedetect=noise={db}dB:d={d}','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',o)]; en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',o)]
    dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',mp3],capture_output=True,text=True).stdout.strip())
    sil=list(zip(st,en+[dur]*(len(st)-len(en))))
    sp=[]; cur=0.0
    for a,b in sil:
        if a-cur>0.08: sp.append([cur,a])
        cur=b
    if dur-cur>0.08: sp.append([cur,dur])
    return sp,dur
def align1(mp3,texts,db=-35,dd=0.25):
    sp,dur=chunks(mp3,db,dd); n=len(texts); m=len(sp)
    w=[max(2,len(H.sub('',t.replace('ﷺ','صلى الله عليه وسلم')).replace(' ',''))) for t in texts]
    if m<n: return None,sp
    tot=sum(b-a for a,b in sp); k=tot/sum(w)
    import math
    INF=1e18; dp=[[INF]*(m+1) for _ in range(n+1)]; bk=[[0]*(m+1) for _ in range(n+1)]; dp[0][0]=0
    for i in range(1,n+1):
        for j in range(i,m-(n-i)+1):
            for s in range(i-1,j):
                if dp[i-1][s]>=INF: continue
                d=sp[j-1][1]-sp[s][0]
                # gap before group (pauses between lines are usually longer)
                gap=(sp[s][0]-sp[s-1][1]) if s>0 else 1.0
                c=((d-k*w[i-1])/(k*w[i-1]+0.6))**2 - 0.35*min(gap,2.0)
                if dp[i-1][s]+c<dp[i][j]: dp[i][j]=dp[i-1][s]+c; bk[i][j]=s
    res=[]; j=m
    for i in range(n,0,-1):
        s=bk[i][j]; res.append([round(max(0,sp[s][0]-0.1),2),round(sp[j-1][1]+0.12,2)]); j=s
    return res[::-1],sp
def quality(texts,res):
    import math
    w=[max(2,len(H.sub('',t.replace('ﷺ','صلى الله عليه وسلم')).replace(' ',''))) for t in texts]
    r=[math.log(wi/max(.2,b-a)) for wi,(a,b) in zip(w,res)]
    mu=sum(r)/len(r); return (sum((x-mu)**2 for x in r)/len(r))**.5
def align(mp3,texts):
    best=None
    for db,dd in ((-35,.25),(-32,.2),(-30,.15),(-28,.12),(-26,.1)):
        res,sp=align1(mp3,texts,db,dd)
        if not res: continue
        q=quality(texts,res)
        if best is None or q<best[0]: best=(q,res,sp)
    if not best: return None,[]
    align.q=best[0]; return best[1],best[2]
if __name__=='__main__':
    L=json.load(open(sys.argv[2])); r,sp=align(sys.argv[1],[t for _,t in L])
    print(len(sp),'chunks')
    for (spk,t),(a,b) in zip(L,r): print(f'{a:6.2f}-{b:6.2f} {b-a:5.2f}s {len(H.sub("",t)):3d}ch {spk} {t[:38]}')
