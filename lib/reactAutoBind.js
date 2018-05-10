const autoBind = require('./autoBind');

const classLifyCycle = [
  'constructor'
];

const reactLifeCycle = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'render',
  'componentDidCatch'
];

module.exports = (excludeFunNames = []) => {
  if(Array.isArray(excludeFunNames) && excludeFunNames.length > 0) {
    return autoBind([].concat(classLifyCycle, reactLifeCycle, excludeFunNames));
  }

  return autoBind([].concat(classLifyCycle, reactLifeCycle));
}