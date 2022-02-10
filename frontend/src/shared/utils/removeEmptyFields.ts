export function removeEmptyFields(object: any) {
  Object.keys(object).forEach((key) => {
    if (object[key] === '') {
      object[key] = undefined;
    }

    if (Array.isArray(object[key]) && object[key].length === 0) {
      object[key] = undefined;
    }
  });

  return object;
}
