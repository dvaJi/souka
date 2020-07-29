import { Router, Response, Request } from 'express';

import * as fs from 'fs';
import 'ag-psd/initialize-canvas';
import { readPsd, Psd } from 'ag-psd';
import * as path from 'path';
import { createCanvas } from 'canvas';
import { promisify } from 'util';

const readdirAsync = promisify(fs.readdir);

const chapter: Router = Router();

// Retrieve all Chapters
chapter.get('/', (req: Request, res: Response) => {
  res.json({ pages: [] });
});

chapter.get('/:chapterId', async (req: Request, res: Response) => {
  const directoryPath = path.join(__dirname, '..', '..', 'public', 'ch01');

  const psdList = [];
  const imgList = [];

  const files = await readdirAsync(directoryPath);
  files.forEach(file => {
    if (file.endsWith('.psd')) {
      psdList.push(file);
    } else if (file.endsWith('.png')) {
      imgList.push(file);
    }
  });

  const chapterFinal = {
    id: 1,
    uniqid: 'fed33b44-f886-4efa-8102-96ec68e7c27e',
    pages: [],
    originalText: [],
  };

  for await (const psdFile of psdList) {
    console.log(path.join(__dirname, '..', '..', 'public', 'ch01', psdFile));
    const buffer = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'ch01', psdFile));
    const psd2 = readPsd(buffer);

    const textLayers = psd2.children
      .filter(p => p.text)
      .map(p => ({
        top: p.top,
        left: p.left,
        bottom: p.bottom,
        right: p.right,
        opacity: p.opacity,
        name: p.name,
        text: p.text,
        id: p.id,
        referencePoint: p.referencePoint,
      }));

    chapterFinal.originalText.push(textLayers.map((p, index) => ({ index, text: p.text.text })));

    chapterFinal.pages.push({
      filename: psdFile.replace('.psd', ''),
      width: psd2.width,
      height: psd2.height,
      path: 'http://localhost:3000/ch01/' + getGeneratedFileName(psdFile),
      textLayers,
    });

    if (!imgList.includes(psdFile)) {
      createImageBackground(psd2, psdFile);
    }
  }

  res.json(chapterFinal);
});

/**
 * Merge all non text layers.
 * @param psd
 */
function createImageBackground(psd: Psd, filename: string) {
  const can3 = createCanvas(psd.width, psd.height);
  const ctx3 = can3.getContext('2d');
  ctx3.drawImage(psd.children[0].canvas, 0, 0);

  // iterate over layers, ignore text and empty canvas layers
  for (const p of psd.children) {
    if (p.text) {
      break;
    }

    if (p.canvas) {
      ctx3.drawImage(p.canvas, p.left, p.top);
    }
  }

  // generate .png file
  fs.writeFileSync(path.join(__dirname, '..', '..', 'public', 'ch01', getGeneratedFileName(filename)), can3.toBuffer());
}

function getGeneratedFileName(file) {
  return file.replace('.psd', '.png');
}

export default chapter;
