import json,re,collections,sys
sys.path.insert(0,'/home/claude/fusha'); from detect import hits
T=json.load(open('tokens2.json'))
SEG=re.compile(r'[؀-ۿݐ-ݿ«»"\'0-9٠-٩  ‌‏\-–—/%+.,:!?()…؟،؛]*[؀-ۿ][؀-ۿݐ-ݿ«»0-9٠-٩  ‌‏\-–—/%+.,:!?()…؟،؛]*')
if __name__=="__main__":
    c=collections.Counter(); where=collections.defaultdict(set)
    for t in T:
        raw=t['raw']
        for m in SEG.finditer(raw):
            s=m.group(0).strip(' "\'')
            if s and hits(s): c[s]+=1; where[s].add(t['blk'])
    print('distinct segs',len(c),'chars',sum(len(s) for s in c))
    L=sorted(c,key=len); print('len pct', [len(L[int(len(L)*q)]) for q in (.25,.5,.75,.9,.99)])
    json.dump([{'s':s,'n':c[s],'b':sorted(where[s])} for s in c],open('segs.json','w'),ensure_ascii=False)
