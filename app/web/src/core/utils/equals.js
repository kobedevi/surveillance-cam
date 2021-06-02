/**
 * Deep comparison of two variables
 *
 * Based on object-comparison
 *   University Of Helsinki (The National Library Of Finland)
 *   https://github.com/NatLibFi/object-comparison
 *
 * @param {object} obj1
 * @param {object} obj2
 * @return boolean
 */

const equals = (obj1, obj2, options = {}) => {
  // Options
  const strict = options?.strict ?? true;
  const caseSensitive = options?.caseSensitive ?? true;

  /**
   * Different type
   */
  if (typeof obj1 !== typeof obj2) {
    if (
      !strict &&
      (typeof obj1 === 'number' || typeof obj1 === 'string') &&
      (typeof obj2 === 'number' || typeof obj2 === 'string')
    ) {
      // eslint-disable-next-line eqeqeq
      return obj1 == obj2;
    }
    return false;
  }

  switch (typeof obj1) {
    case 'object':
      /**
       * Arrays
       */
      if (Array.isArray(obj1) || Array.isArray(obj2)) {
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
          if (obj1.length !== obj2.length) {
            return false;
          }
          return obj1.every((value, index) => equals(value, obj2[index]));
        }
        return false;
      }

      /**
       * Null
       */
      if (obj1 === null || obj2 === null) {
        if (obj1 === null && obj2 === null) {
          return true;
        }
        return false;
      }

      /**
       * Objects
       */
      if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
      }
      return Object.keys(obj1).every(
        (key) => key in obj2 && equals(obj1[key], obj2[key])
      );

    case 'string':
      /**
       * Strings
       */
      return caseSensitive
        ? obj1 === obj2
        : obj1.localeCompare(obj2, undefined, { sensitivity: 'accent' }) === 0;

    default:
      /**
       * Primitives
       */
      return obj1 === obj2;
  }
};

export default equals;
