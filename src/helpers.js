const API_BASE = 'http://localhost:3002';

export const endPoint = (str) => API_BASE + str;

export const objectToQuery = (obj) => {
  return (
    '_' +
    Object.keys(obj)
      .map((key) => key && key.toString() + '=' + obj[key])
      .filter(Boolean)
      .join('&_')
  );
};

export const sortOptions = {
  pos: 'Pos',
  breeder: 'Breeder',
  pigeon: 'Pigeon',
  color: 'Color',
  sex: 'Sex',
  arrival: 'Arrival',
  speed: 'Speed',
};
