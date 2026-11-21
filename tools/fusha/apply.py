import json,re,sys,glob,os
sys.path.insert(0,'/home/claude/fusha'); from seg import SEG
P=json.load(open('plan_frozen.json')); T=json.load(open('tokens2.json'))
EX=[(1312656,1320733),(1329128,1333073),(4319694,4330167)]
M={}
for f in sorted(glob.glob('out/m*.json')): M.update(json.load(open(f,encoding='utf-8')))
for f in []:
    b=int(os.path.basename(f)[1:3]); B=P['batches'][b]
    for ln in open(f,encoding='utf-8'):
        ln=ln.rstrip('\n')
        if not ln.strip(): continue
        i,txt=ln.split('\t',1); i=int(i)
        assert 0<=i<len(B), (f,i)
        M[B[i]]=txt
src=sys.argv[1]; dst=sys.argv[2]
h=open(src,encoding='utf-8').read()
changed=0; quoteFix=0
for t in sorted(T,key=lambda t:-t['s']):
    if any(a<=t['s']<b for a,b in EX): continue
    raw=h[t['s']:t['e']]; assert raw==t['raw'], t['s']
    q=raw[0] if raw[0] in '"\'' else None
    def rep(m):
        g=m.group(0); s=g.strip(' "\''); 
        if s not in M: return g
        n=M[s]
        if q=="'" and "'" in n: n=n.replace("'","’")
        a=g.index(s); return g[:a]+n+g[a+len(s):]
    new=SEG.sub(rep,raw)
    if new!=raw: h=h[:t['s']]+new+h[t['e']:]; changed+=1
open(dst,'w',encoding='utf-8').write(h)
print('map',len(M),'tokens changed',changed)
