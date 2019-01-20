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
