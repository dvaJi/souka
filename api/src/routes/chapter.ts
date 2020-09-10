import { Router, Response, Request } from 'express';

import * as fs from 'fs';
import 'ag-psd/initialize-canvas';
import { readPsd, Psd, Layer } from 'ag-psd';
import * as path from 'path';
import { createCanvas } from 'canvas';
import { promisify } from 'util';
import { AnySrvRecord } from 'dns';

const readdirAsync = promisify(fs.readdir);

const chapter: Router = Router();

// Retrieve all Chapters
chapter.get('/', (req: Request, res: Response) => {
  res.json({ pages: [] });
});

chapter.get('/:chapterId', async (req: Request, res: Response) => {
  const directoryPath = path.join(__dirname, '..', '..', 'public', req.params.chapterId);

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
    console.log(path.join(__dirname, '..', '..', 'public', req.params.chapterId, psdFile));
    const buffer = fs.readFileSync(path.join(__dirname, '..', '..', 'public', req.params.chapterId, psdFile));
    const psd2 = readPsd(buffer);

    const textLayers: any[] = getLayers(psd2.children);

    chapterFinal.originalText.push(textLayers.map((p, index) => ({ index, text: p.text.text })));

    chapterFinal.pages.push({
      filename: psdFile.replace('.psd', ''),
      width: psd2.width,
      height: psd2.height,
      path: `http://localhost:8000/${req.params.chapterId}/${getGeneratedFileName(psdFile)}`,
      textLayers,
    });

    if (!imgList.includes(psdFile)) {
      createImageBackground(psd2, psdFile, req.params.chapterId);
    }
  }

  res.json(chapterFinal);
});

const filterLayers = (p: Layer) => p.text || p.children !== undefined;
const mapTextLayers = (p: Layer) => ({
  top: p.top,
  left: p.left,
  bottom: p.bottom,
  right: p.right,
  opacity: p.opacity,
  name: p.name,
  text: p.text,
  id: p.id,
  referencePoint: p.referencePoint,
  effects: p.effects,
});

function getLayers(children: Layer[]) {
  let layers = [];
  children.filter(filterLayers).forEach(p => {
    if (p.children) {
      layers = [...layers, ...getLayers(p.children)];
    } else {
      layers.push(mapTextLayers(p));
    }
  });

  return layers;
}

/**
 * Merge all non text layers.
 * @param psd
 */
function createImageBackground(psd: Psd, filename: string, chapterId: string) {
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
  fs.writeFileSync(
    path.join(__dirname, '..', '..', 'public', chapterId, getGeneratedFileName(filename)),
    can3.toBuffer(),
  );
}

function getGeneratedFileName(file) {
  return file.replace('.psd', '.png');
}

export default chapter;
