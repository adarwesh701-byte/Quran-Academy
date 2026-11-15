# Itqan Academy — one cell does everything: (re)load the voice model if needed, upload what's ready, then keep generating.
import subprocess, sys, urllib.request, os
G = 'https://raw.githubusercontent.com/adarwesh701-byte/Quran-Academy/main/docs/'
csv_name = 'itqan-voice-lines.csv'
if 'model' not in globals():
    print('⏳ loading the voice model (first time ~5 min)…')
    subprocess.run([sys.executable, '-m', 'pip', '-q', 'install', 'chatterbox-tts', 'supabase', 'pydub', 'librosa', 'soundfile'])
    subprocess.run([sys.executable, '-m', 'pip', '-q', 'uninstall', '-y', 'torchvision'])
    urllib.request.urlretrieve(G + csv_name, csv_name)
    refs = []
    for n in ['ref1.mp3', 'ref2.mp3']:
        try: urllib.request.urlretrieve(G + 'voice-ref/' + n, n); refs.append(n)
        except Exception as e: print('no', n)
    import torch
    from pydub import AudioSegment
    seg = AudioSegment.empty()
    for r in refs: seg += AudioSegment.from_file(r).set_channels(1).set_frame_rate(24000)
    seg = seg[:25000]; seg.export('ref.wav', format='wav')
    from chatterbox.mtl_tts import ChatterboxMultilingualTTS
    model = ChatterboxMultilingualTTS.from_pretrained(device='cuda' if torch.cuda.is_available() else 'cpu')
    print('✅ model ready')
elif not os.path.exists(csv_name):
    urllib.request.urlretrieve(G + csv_name, csv_name)
exec(urllib.request.urlopen(G + 'vupload.py').read().decode())
exec(urllib.request.urlopen(G + 'vgen.py').read().decode())
