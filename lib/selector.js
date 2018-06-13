/**
 * ------------------------------------------------------------------
 * validators
 * ------------------------------------------------------------------
 */
const validator = ['String', 'Array', 'Function'].reduce((total, currentValue) => {
  total[`is${currentValue}`] = val => Object.prototype.toString.call(val) === `[object ${currentValue}]`;
  return total;
}, {});

/**
 * 函数功能简述
 * 根据redux store 结构快速获取节点数据
 *
 * @param    {object}  state  redux store
 * @param    {array or string} keyPath redux store 数据结构节点key值
 * @returns  {object}  result
 *
 * @date     2018-02-17
 * @author   Breeze_微风<332522058@qq.com>
 */

export const reduxPicker = (state, keyPath) => {
  // String keyPath
  if (validator.isString(keyPath)) return state[keyPath] || {};
  // Array keyPath
  if (validator.isArray(keyPath) === '[object Array]') {
    let result = state;
    for (const key of keyPath) {
      result = result[key];
      if (result === undefined) {
        result = {};
        break;
      }
    }
    return result;
  }
};

/**
 * 函数功能简述
 * 根据funsee架构的reducer固定结构设计 快速获取redux store 节点数据
 *
 * @param    {string}  moduleName (directory structure)
 * @param    {object}  targetKeyStructure  需要return的对象结构及redux store keyPath
 * @returns  {object}  result
 *
 * @date     2018-06-04
 * @author   Breeze_微风<332522058@qq.com>
 */
export const funseeSelector = (targetKeyStructure, modueleName) => (state) => {
  const _state = state[modueleName] || {};
  if (validator.isString(targetKeyStructure)) {
    return {
      targetKeyStructure: _state[targetKeyStructure] || {}
    };
  }

  if (validator.isArray(targetKeyStructure)) {
    return targetKeyStructure.reduce((total, currentValue) => {
      if (validator.isString(currentValue)) total[currentValue] = reduxPicker(_state, currentValue);
      if (validator.isArray(currentValue)) total[currentValue.pop()] = reduxPicker(_state, currentValue);
      return total;
    }, {});
  }
};

/**
 * ------------------------------------------------------------------
 * 合并多个跨模块的selector
 * ------------------------------------------------------------------
 */
export const funseeSelectorCompose = selectorArray => (state) => {
  selectorArray.reduce((total, currentValue) => {
    if (validator.isFunction(currentValue)) total = Object.assign(total, currentValue(state));
    return total;
  }, {});
};
