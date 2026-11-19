import sys, subprocess, os
from PIL import Image
pdf,out,dpi=sys.argv[1],sys.argv[2],sys.argv[3]; pages=[int(x) for x in sys.argv[4].split(',')]; per=int(sys.argv[5]) if len(sys.argv)>5 else 4
os.makedirs(out,exist_ok=True); ims=[]
for p in pages:
    subprocess.run(['pdftoppm','-f',str(p),'-l',str(p),'-r',dpi,'-png','-singlefile',pdf,f'{out}/q{p}'],check=True); ims.append(Image.open(f'{out}/q{p}.png').convert('RGB'))
cols=2
for k in range(0,len(ims),per):
    g=ims[k:k+per]; w=max(i.width for i in g); h=max(i.height for i in g); rows=(len(g)+1)//2
    S=Image.new('RGB',(w*cols,h*rows),'white')
    for j,im in enumerate(g): S.paste(im,((cols-1-j%cols)*w,(j//cols)*h))
    S.save(f'{out}/pick{k//per}.png'); print(f'{out}/pick{k//per}.png',S.size)
