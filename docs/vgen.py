# Itqan Academy — generate the remaining voice lines and upload every 25 to the site.
# Needs cells 1–3 to have run (model + ref.wav).
# 5) ولّد كل الجمل في ملف مضغوط (يكمل من مكان ما وقف لو قطع)
import csv, hashlib, json, os, zipfile, time, urllib.request
from pydub import AudioSegment
import soundfile as sf, librosa
PITCH = {'m': 0, 'f': 4, 'k': 7}   # الست والطفل = صوتك بطبقة أعلى
LIMIT = 5000                       # عدد الجمل في المرة
def h(t): return hashlib.sha256(t.strip().encode()).hexdigest()[:40]
rows = list(csv.DictReader(open(csv_name, encoding='utf-8-sig')))
try:
    import urllib.request as _u2
    _ak = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlteWNmeG1pZ3Z2ZXJtc2RuYWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5NjU1NjYsImV4cCI6MjEwOTU0MTU2Nn0.V0PUmuhKM7EPVxi2rwvPPi1WdoOsXxJr-6-lyZVtm7g'
    _rq2 = _u2.Request('https://ymycfxmigvvermsdnagm.supabase.co/rest/v1/rpc/vclone_pending', data=b'{}', headers={'apikey': _ak, 'Authorization': 'Bearer ' + _ak, 'Content-Type': 'application/json'})
    _pend = json.loads(_u2.urlopen(_rq2).read()); _seen = {r['text'].strip() for r in rows}
    rows += [{'text': t, 'kind': 'm'} for t in _pend if t.strip() not in _seen]; print('site jobs added:', len(_pend))
except Exception as e: print('no site jobs', e)
# الشغل بيتحفظ في Google Drive عشان لو Colab فصل يكمّل من مكان ما وقف (اسمح لـ Drive لما يطلب)
OUT = 'out'  # uploads go straight to the site, no Drive needed
os.makedirs(OUT, exist_ok=True)
if os.path.islink('out') or os.path.exists('out'):
    pass
elif OUT != 'out':
    os.symlink(OUT, 'out')
man = json.load(open('out/manifest.json')) if os.path.exists('out/manifest.json') else []
done = {(x['h'], x['kind']) for x in man}
# الأصوات اللي اترفعت على الموقع قبل كده (من أي إيميل) ما تتعملش تاني
try:
    import urllib.request as _u
    _rq = _u.Request('https://ymycfxmigvvermsdnagm.supabase.co/rest/v1/voice_lines?select=h,kind&src=eq.clone&status=eq.approved&limit=20000', headers={'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlteWNmeG1pZ3Z2ZXJtc2RuYWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5NjU1NjYsImV4cCI6MjEwOTU0MTU2Nn0.V0PUmuhKM7EPVxi2rwvPPi1WdoOsXxJr-6-lyZVtm7g', 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlteWNmeG1pZ3Z2ZXJtc2RuYWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5NjU1NjYsImV4cCI6MjEwOTU0MTU2Nn0.V0PUmuhKM7EPVxi2rwvPPi1WdoOsXxJr-6-lyZVtm7g'})
    _have = json.loads(_u.urlopen(_rq).read()); done |= {(x['h'], x['kind']) for x in _have}; print('على الموقع بالفعل:', len(_have))
except Exception as e: print('ماقدرتش أشوف الموقع', e)
todo = [x for x in rows if (h(x['text']), x['kind']) not in done][:LIMIT]
SENT, PART = len(man), 0
print(len(rows), 'lines total |', len(done), 'done before |', len(todo), 'now')
for i, x in enumerate(todo):
    t, kind = x['text'].strip(), x['kind']
    try:
        w = model.generate(t, language_id='ar', audio_prompt_path='ref.wav').squeeze().cpu().numpy()
        if PITCH.get(kind): w = librosa.effects.pitch_shift(w, sr=model.sr, n_steps=PITCH[kind])
        sf.write('o.wav', w, model.sr); f = f"{h(t)}-{kind}.mp3"
        AudioSegment.from_wav('o.wav').export('out/' + f, format='mp3', bitrate='64k')
        man.append({'h': h(t), 'text': t, 'kind': kind, 'file': f})
        if i % 10 == 0:
            print(i, t[:40]); json.dump(man, open('out/manifest.json', 'w'), ensure_ascii=False)
        if len(man) - SENT >= 25:   # كل 100 جملة: ملف صغير بينزل عندك على طول عشان مفيش حاجة تضيع لو Colab فصل
            part = man[SENT:]; SENT = len(man); PART += 1; zn = f'itqan-voices-part{PART}.zip'
            with zipfile.ZipFile(zn, 'w') as z:
                for y in part: z.write('out/' + y['file'], y['file'])
                z.writestr('manifest.json', json.dumps(part, ensure_ascii=False))
            print('⬆️ part', PART); exec(urllib.request.urlopen('https://raw.githubusercontent.com/adarwesh701-byte/Quran-Academy/main/docs/vupload.py').read().decode())
    except Exception as e:
        print('skip', t[:30], e); time.sleep(1)
json.dump(man, open('out/manifest.json', 'w'), ensure_ascii=False)
with zipfile.ZipFile('itqan-voices.zip', 'w') as z:
    for x in man: z.write('out/' + x['file'], x['file'])
    z.write('out/manifest.json', 'manifest.json')
from google.colab import files; files.download('itqan-voices.zip')
print('✓ اتنزّل itqan-voices.zip — ارفعه من الموقع')