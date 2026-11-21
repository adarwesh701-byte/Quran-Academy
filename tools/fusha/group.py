import json,re,bisect,collections,sys
sys.path.insert(0,'/home/claude/fusha'); from detect import hits
h=open('/home/claude/src/app/itqan-academy-v296-batch01/index.html',encoding='utf-8').read()
T=json.load(open('tokens.json'))
marks=[(m.start(),m.group(1)) for m in re.finditer(r'/\*\s*=+\s*(v\d+)[^\n]{0,60}',h)]
pos=[x[0] for x in marks]
# also mark the big I18N dictionaries by line ranges
g=collections.Counter(); gc=collections.Counter()
for t in T:
    i=bisect.bisect(pos,t['s'])-1; blk=marks[i][1] if i>=0 else 'core'
    t['blk']=blk; hh=hits(t['raw']); t['h']=hh
    if hh: g[blk]+=1; gc[blk]+=len(t['raw'])
json.dump(T,open('tokens2.json','w'),ensure_ascii=False)
print(len(g)); print(sorted(g.items(),key=lambda x:-x[1])[:60]); print('chars',sum(gc.values()))
