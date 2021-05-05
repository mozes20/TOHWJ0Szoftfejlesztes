import json

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from PIL import Image
import sys
import re



im = Image.open(sys.argv[1])
f = open(sys.argv[2], "r")
to_python = json.loads(f.read())

width, height = im.size
fig, ax = plt.subplots()
ax.imshow(im)

res = re.split('/', sys.argv[1])
res2 = re.split('/', sys.argv[2])
res3 = res2[-1].split(".")
tmpinit=res3[0]

i = 0
tmpIndex=0
for img in to_python[tmpinit][0]['Images']:
    if res[-1] == img['ImageName']:
        tmpIndex=i
    i += 1



for adat in to_python[res3[0]][0]['Images'][tmpIndex]['BoundingBoxes']:

    rect = patches.Rectangle((adat['CenterX']*width-(adat['Width']*width)/2, adat['CenterY']*height-(adat['Height']*height)/2), adat['Width']*width, adat['Height']*height, linewidth=1.5, edgecolor=( 'Magenta' ), facecolor='none')
    ax.add_patch(rect)

plt.show()