const autobind = (excludeFunNames = ['constructor']) => (Target) => {
  if (typeof Target !== 'function') {
    throw new TypeError(
      'The autobind decorator must be passed a function as the second argument.'
    );
  }

  if (!Array.isArray(excludeFunNames)) {
    throw new TypeError(
      'The autobind decorator must be passed an array as the first argument.'
    );
  }

  const { prototype } = Target;
  Object.getOwnPropertyNames(prototype).forEach((item) => {
    if (excludeFunNames.indexOf(item) === -1 && typeof prototype[item] === 'function') {
      const propDescriptor = Object.getOwnPropertyDescriptor(prototype, item);
      const { value, configurable, enumerable } = propDescriptor;
      if (typeof value === 'function' && configurable) {
        Object.defineProperty(prototype, item, {
          enumerable,
          configurable,
          get() {
            if (this.hasOwnProperty(item)) {
              // Don't bind the prototype's method to the prototype, or we can't re-bind it to instances.
              return value;
            }
            const boundMethod = value.bind(this);
            Object.defineProperty(this, item, {
              enumerable,
              configurable,
              value: boundMethod,
              writable: propDescriptor.writable !== false
            });

            return boundMethod;
          },
          set(newValue) {
            if (propDescriptor.writable) {
              Object.defineProperty(prototype, item, {
                value: newValue,
                configurable: true,
                enumerable: true,
                writable: true
              });
            }
          }
        });
      }
    }
  });
};

module.exports = autobind;
