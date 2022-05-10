export const objectToQuery = (obj) => {
  return (
    '_' +
    Object.keys(obj)
      .map((key) => key && key.toString() + '=' + obj[key])
      .filter(Boolean)
      .join('&_')
  );
};
