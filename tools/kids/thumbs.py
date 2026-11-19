import sys, subprocess, glob, os
from PIL import Image, ImageDraw
pdf,out=sys.argv[1],sys.argv[2]; os.makedirs(out,exist_ok=True); t=out+'/th'; os.makedirs(t,exist_ok=True)
for f in glob.glob(t+'/*'): os.remove(f)
subprocess.run(['pdftoppm','-r','10','-png',pdf,t+'/p'],check=True)
fs=sorted(glob.glob(t+'/p-*.png'), key=lambda x:int(x.rsplit('-',1)[1][:-4]))
ims=[Image.open(f).convert('RGB') for f in fs]; w=max(i.width for i in ims); h=max(i.height for i in ims); cols=14
S=Image.new('RGB',(cols*w,((len(ims)+cols-1)//cols)*(h+12)),'white'); d=ImageDraw.Draw(S)
for k,im in enumerate(ims):
    x=(k%cols)*w; y=(k//cols)*(h+12); S.paste(im,(x,y+12)); d.text((x+2,y),str(k+1),fill='red')
S.save(out+'/thumbs.png'); print(S.size,len(ims))
