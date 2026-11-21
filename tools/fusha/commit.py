import json,sys,re,os
P=json.load(open('/home/claude/fusha/plan_frozen.json'))
b=int(sys.argv[1]); B=P['batches'][b]; M={}
for ln in open(f'/home/claude/fusha/out/b{b:02d}.tsv',encoding='utf-8'):
    ln=ln.rstrip('\n')
    if not ln.strip(): continue
    i,t=ln.split('\t',1); i=int(i); assert 0<=i<len(B)
    o=B[i]
    if '"' in t: assert t.count('"')==o.count('"') and t.count('", "')==o.count('", "') and (o[0] not in '(?,' or t[:2]==o[:2]), (i,t)
    assert not re.search(r'[`\\]|\$\{',t),(i,t)
    M[B[i]]=t
json.dump(M,open(f'/home/claude/fusha/out/m{b+10:02d}.json','w'),ensure_ascii=False,indent=0)
os.rename(f'/home/claude/fusha/out/b{b:02d}.tsv',f'/home/claude/fusha/out/done_b{b:02d}.tsv')
print('committed',b,len(M))
