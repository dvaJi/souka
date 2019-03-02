import FileSaver from 'file-saver';

// Render element or component by provided condition
export function renderIf(condition: boolean, renderFn: Function) {
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

export const fileTemplate =
  '1,0\n-\nInside the box\nOutside the box\n-\nExported by Souka\n';

export function exportFile(filename: string, data: string) {
  var blob = new Blob([data], {
    type: 'text/plain;charset=utf-8',
    endings: 'native'
  });
  FileSaver.saveAs(blob, filename);
}
