import FileSaver from 'file-saver';
import { writePsd } from 'ag-psd';

export function generateFile(): Blob {
  const psd = {
    width: 800,
    height: 800,
    children: [
      {
        name: 'Layer 1'
      },
      {
        name: 'text layer',
        text: {
          text: 'Hello world', // text you want to draw
          transform: [1, 0, 0, 1, 400, 400], // move text 50px horizontally and 50px vertically
          style: {
            font: { name: 'ArialMT' }, // need to provide full name here
            fontSize: 30,
            fillColor: { r: 255, g: 0, b: 0 } // opaque red
          }
        }
      },
      {
        name: 'text layer',
        text: {
          text: 'Hello world\nanother line', // text you want to draw
          transform: [1, 0, 0, 1, 90, 10], // move text 50px horizontally and 50px vertically
          style: {
            font: { name: 'ArialMT' }, // need to provide full name here
            fontSize: 30
          },
          styleRuns: [
            {
              length: 5, // length of 'Hello'
              style: { fillColor: { r: 255, g: 0, b: 0 } } // make 'Hello' red
            },
            {
              length: 7, // length of ' world\n'
              style: { fillColor: { r: 0, g: 0, b: 255 } } // make 'world' blue
            },
            {
              length: 12, // length of 'another line'
              style: { fillColor: { r: 0, g: 255, b: 0 }, underline: true } // make 'another line' green and underlined
            }
          ],
          paragraphStyle: {
            justification: 'center' // center justify whole block of text
          }
        }
      }
    ]
  };

  const buffer = writePsd(psd as any, { invalidateTextLayers: false });
  const blob = new Blob([buffer], { type: 'application/octet-stream' });

  return blob;
}

export function exportFile(filename: string, blob: Blob) {
  FileSaver.saveAs(blob, filename, { autoBom: true });
}
