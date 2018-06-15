const path = require('path');
console.log('sep: ', path.sep)

const _replace = _path => {
  console.log('bbb:', _path)
  const str = _path.replace(/\//g, path.sep);
  console.log('aaaa:', str)
  return str;
};

export const resolve = (...paths) => path.resolve(...(paths.map((path) => _replace(path))));

export const relative = (from, to) => path.relative(_replace(from), _replace(to));

export const join = (...paths) => path.join(...(paths.map((path) => _replace(path))));