import FileSaver from 'file-saver';
import { Labels } from '../types/States';

// Render element or component by provided condition
export function renderIf(condition: boolean, renderFn: () => void) {
  return condition ? renderFn() : null;
}

// Check if object is empty
export function isEmpty(obj: any) {
  let name;
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  if (obj.constructor !== Object) {
    return false;
  }
  return true;
}

export function generateFile(labelList: Labels) {
  let file = '1,0\n-\nInside the box\nOutside the box\n-\nExported by Souka\n';
  const keys = Object.keys(labelList);
  keys.forEach(key => {
    file += `\n>>>>>>>>[${key}]<<<<<<<<\n`;
    const labels = labelList[key];
    const labelsKeys = Object.keys(labelList[key]);
    labelsKeys.forEach(ki => {
      const start = {
        y: labels[ki].startCoordinates.y.toFixed(3),
        x: labels[ki].startCoordinates.x.toFixed(3)
      };
      const size = {
        height: (labels[ki].image.endCoordinates.y - labels[ki].image.startCoordinates.y).toFixed(3),
        width: (labels[ki].image.endCoordinates.x - labels[ki].image.startCoordinates.x).toFixed(3)
      };
      file += `----------------[${ki}]----------------[${start.x},${start.y},${size.width},${size.height},1]\n`;
      if (labels[ki].type !== 'normal') {
        file += `${labels[ki].type}: `;
      }
      file += `${labels[ki].text}\n`;
    });
  });

  return file;
}

export function exportFile(filename: string, data: string) {
  const blob = new Blob([data], {
    type: 'text/plain;charset=utf-8',
    endings: 'native'
  });
  FileSaver.saveAs(blob, filename);
}
