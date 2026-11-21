import json,re,sys
sys.path.insert(0,'/home/claude/fusha'); from detect import hits
from seg import SEG
T=json.load(open('tokens2.json'))
EX=[(1312656,1320733),(1329128,1333073)]
segs={}
for t in T:
    ex=any(a<=t['s']<b for a,b in EX)
    for m in SEG.finditer(t['raw']):
        s=m.group(0).strip(' "\'')
        if not s or not hits(s): continue
        d=segs.setdefault(s,{'n':0,'ex':0,'b':set(),'tl':0})
        d['n']+=1; d['ex']+=ex; d['b'].add(t['blk']); d['tl']+= ('~' in t['raw'])
todo=[s for s,d in segs.items() if d['ex']<d['n']]
print('total',len(segs),'excluded-only',len(segs)-len(todo))
# order by block for context
todo.sort(key=lambda s:(min(segs[s]['b'],key=lambda b:int(b[1:]) if b[1:].isdigit() else 0), s))
batches=[];cur=[];cl=0
for i,s in enumerate(todo):
    cur.append(s); cl+=len(s)
    if cl>5500 or len(cur)>=160: batches.append(cur); cur=[];cl=0
if cur: batches.append(cur)
json.dump({'todo':todo,'batches':batches,'meta':{s:{'b':sorted(segs[s]['b']),'tl':segs[s]['tl']} for s in todo}},open('plan.json','w'),ensure_ascii=False)
print('batches',len(batches))
