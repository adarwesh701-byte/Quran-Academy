# Itqan Academy — upload every generated voice file to the site (goes to the owner's review list).
import json, base64, urllib.request, os, glob, time
URL = 'https://ymycfxmigvvermsdnagm.supabase.co/functions/v1/vinbox'
OUTD = 'out' if os.path.exists('out') else '/content/drive/MyDrive/itqan-voices-out'
man = json.load(open(os.path.join(OUTD, 'manifest.json'))) if os.path.exists(os.path.join(OUTD, 'manifest.json')) else []
sent_f = os.path.join(OUTD, 'uploaded.json')
sent = set(json.load(open(sent_f))) if os.path.exists(sent_f) else set()
todo = [x for x in man if x['file'] not in sent and os.path.exists(os.path.join(OUTD, x['file']))]
print('files ready:', len(man), '| already uploaded:', len(sent), '| uploading now:', len(todo))
ok = 0
for i in range(0, len(todo), 15):
    chunk = todo[i:i + 15]
    items = [{'h': x['h'], 'text': x['text'], 'kind': x['kind'], 'b64': base64.b64encode(open(os.path.join(OUTD, x['file']), 'rb').read()).decode()} for x in chunk]
    for attempt in range(3):
        try:
            req = urllib.request.Request(URL, data=json.dumps({'items': items}).encode(), headers={'Content-Type': 'application/json'})
            r = json.loads(urllib.request.urlopen(req, timeout=180).read()); break
        except Exception as e:
            print('retry', e); time.sleep(5); r = {'results': []}
    for x, res in zip(chunk, r.get('results', [])):
        if res.get('ok'): sent.add(x['file']); ok += 1
        else: print('skip', x['text'][:30], res.get('e'))
    json.dump(sorted(sent), open(sent_f, 'w'))
    print(f'{min(i + 15, len(todo))}/{len(todo)} uploaded ✓ {ok}')
print('✅ done — open the site: Settings → 🎙️ Recording studio → Approve all')
