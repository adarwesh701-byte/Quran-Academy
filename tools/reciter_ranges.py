# يحسب مساحة صوت كل شيخ (أوطى وأعلى طبقة مريحة) من تلاوته — بيشتغل على GitHub Actions
import json, os, io, urllib.request, numpy as np, librosa
REC = json.load(open('tools/reciters.json', encoding='utf-8'))
AYAT = ['001001','001002','001005','001007','002255','036001','067001','112001','113001','114001','055013','019001']
out = {}
def note(hz):
    if not hz: return None
    return librosa.hz_to_note(hz, unicode=False)
for folder, name in REC:
    f0s = []
    for a in AYAT:
        url = f'https://everyayah.com/data/{folder}/{a}.mp3'
        try:
            data = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read()
            y, sr = librosa.load(io.BytesIO(data), sr=16000, mono=True)
            f0, vf, vp = librosa.pyin(y, fmin=65, fmax=700, sr=sr, frame_length=2048)
            f0 = f0[vf & (vp > 0.6)]
            f0s.extend([x for x in f0 if x and not np.isnan(x)])
        except Exception as e:
            print('skip', folder, a, e)
    if len(f0s) < 200: print('few', folder, len(f0s)); continue
    arr = np.array(f0s)
    lo, med, hi = np.percentile(arr, [5, 50, 95])
    out[folder] = {'name': name, 'low': round(float(lo), 1), 'mid': round(float(med), 1), 'high': round(float(hi), 1), 'lowN': note(lo), 'midN': note(med), 'highN': note(hi), 'n': int(len(arr))}
    print(folder, out[folder])
os.makedirs('data', exist_ok=True)
json.dump(out, open('data/reciter_ranges.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
