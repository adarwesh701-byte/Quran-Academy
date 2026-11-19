import sys, json, re, os, glob, datetime
n, msg = sys.argv[1], sys.argv[2]
root='/home/claude/quran-academy'
s=open(f'{root}/index.html',encoding='utf-8').read()
ver=re.search(r'const UI_VERSION = "([^"]+)"', s).group(1)
s=s.replace('<head>','<head><base href="/">',1).replace('if (v && v !== UI_VERSION)','if (false && v && v !== UI_VERSION)')
open(f'{root}/archive/v{n}.html','w',encoding='utf-8').write(s)
L=json.load(open(f'{root}/archive/list.json',encoding='utf-8'))
L=[x for x in L if x['v']!=f'v{n}']
L.insert(0,{'v':f'v{n}','ui':ver,'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'msg':re.sub(r'^v\d+:\s*','',msg)[:220]})
KEEP=3
keep=L[:KEEP]
for x in L[KEEP:]:
    f=f"{root}/archive/{x['v']}.html"
    if os.path.exists(f): os.remove(f)
json.dump(keep,open(f'{root}/archive/list.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
