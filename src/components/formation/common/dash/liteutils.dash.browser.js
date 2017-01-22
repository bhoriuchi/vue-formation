(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g._$ = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* eslint-disable */
var isString = function isString(obj) {
  return typeof obj === 'string';
};

isString._accepts = ['ANY'];

/* eslint-disable */
var capitalize = function capitalize(str) {
  return isString(str) && str.length ? '' + str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
};

capitalize._accepts = [String];

/* eslint-disable */
var isArray = function isArray(obj) {
  return Array.isArray(obj);
};

isArray._accepts = ['ANY'];

/* eslint-disable */
var forEach = function forEach(obj, fn) {
  try {
    if (isArray(obj)) {
      var idx = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var val = _step.value;

          if (fn(val, idx) === false) break;
          idx++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      for (var key in obj) {
        if (fn(obj[key], key) === false) break;
      }
    }
  } catch (err) {
    return;
  }
};

forEach._accepts = [Object, Array];

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* eslint-disable */
var isObject = function isObject(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null;
};

isObject._accepts = ['ANY'];

/* eslint-disable */
var isFunction = function isFunction(obj) {
  return typeof obj === 'function';
};

isFunction._accepts = ['ANY'];

/* eslint-disable */
var contains = function contains(list, obj) {
  return list.reduce(function (prev, cur) {
    return cur === obj && prev;
  }, false);
};

contains._accepts = [Array];

/* eslint-disable */
var isDate = function isDate(obj) {
  return obj instanceof Date;
};

isDate._accepts = ['ANY'];

/* eslint-disable */
var isHash = function isHash(obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj);
};

isHash._accepts = ['ANY'];
isHash._dependencies = ['dash.isArray', 'dash.isDate', 'dash.isObject'];

/* eslint-disable */
var includes = function includes(obj, key) {
  return isArray(obj) && obj.indexOf(key) !== -1;
};

includes._accepts = [Array];

/* eslint-disable */
// import isArray from './isArray'
// import isDate from './isDate'
// import clone from './clone'

// modified from http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target, source) {
  var seen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (includes(seen, source) || includes(seen, source)) return target;
  seen = seen.concat([target, source]);

  if (isHash(target) && isHash(source)) {
    for (var key in source) {
      if (isHash(source[key])) {
        if (!target[key]) Object.assign(target, defineProperty({}, key, {}));
        mergeDeep(target[key], source[key], seen.slice());
      } else {
        Object.assign(target, defineProperty({}, key, source[key]));
      }
    }
  }
  return target;
}

/*
function _arrayMerge (target, source, seen) {
  forEach(source, (val, i) => {
    if (isArray(val) && !isArray(target[i])) target[i] = val
    else if (target[i] !== undefined) _merge(target[i], val, clone(seen))
    else target.push(val)
  })
}

function _merge (target, source, seen = []) {
  if (includes(seen, source) || includes(seen, source)) return target
  seen = seen.concat([target, source])

  forEach(source, (s, k) => {
    let t = target[k]
    if (t === undefined && isHash(s)) target[k] = _merge({}, s, clone(seen))
    else if (isHash(t) && isHash(s)) target[k] = _merge(t, s, clone(seen))
    else if (isArray(s) && !isArray(t)) target[k] = s
    else if (isArray(s)) forEach(s, (val, i) => _arrayMerge(t, s, seen))
    else if (isDate(s)) target[k] = new Date(s)
    else target[k] = s
  })
  return target
}
*/

var merge = function merge() {
  var args = [].concat(Array.prototype.slice.call(arguments));

  if (args.length === 0) return {};else if (args.length === 1) return args[0];else if (!isHash(args[0])) return {};

  var target = args[0];
  var sources = args.slice(1);

  forEach(sources, function (source) {
    if (isHash(source)) mergeDeep(target, source);
  });
  return target;
};

merge._accepts = [Object];
merge._dependencies = ['dash.isHash', 'dash.forEach', 'dash.includes'];

/* eslint-disable */
var map = function map(obj, fn) {
  var output = [];
  forEach(obj, function (v, k) {
    return output.push(fn(v, k));
  });
  return output;
};

map._accepts = [Object, Array];

/* eslint-disable */
var clone = function clone(obj) {
  var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isArray(obj)) return deep ? map(obj, function (o) {
    return clone(o, true);
  }) : obj.slice(0);
  if (isHash(obj)) return deep ? merge({}, obj) : Object.assign({}, obj);
  if (isDate(obj) && deep) return new Date(obj);
  return obj;
};

clone._accepts = [Object, Array];
clone._dependencies = ['dash.isArray', 'dash.isHash', 'dash.isDate', 'dash.merge', 'dash.map'];

/* eslint-disable */
var circular = function circular(obj) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '[Circular]';

  var circularEx = function circularEx(_obj) {
    var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var seen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    seen.push(_obj);
    if (isObject(_obj)) {
      forEach(_obj, function (o, i) {
        if (contains(seen, o)) _obj[i] = isFunction(value) ? value(_obj, key, clone(seen)) : value;else circularEx(o, i, clone(seen));
      });
    }
    return _obj;
  };

  if (!obj) throw new Error('circular requires an object to examine');
  return circularEx(obj, value);
};

circular._accepts = [Object, Array];
circular._dependencies = ['dash.forEach', 'dash.isObject', 'dash.isFunction', 'dash.contains', 'dash.clone'];

/* eslint-disable */
var difference = function difference() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  return args.reduce(function (prev, cur) {
    if (!isArray(prev) || !isArray(cur)) return [];
    var left = new Set(prev);
    var right = new Set(cur);
    var d = [].concat(toConsumableArray(left)).filter(function (item) {
      return !right.has(item);
    });
    return [].concat(toConsumableArray(d));
  }, args[0]);
};

difference._accepts = [Array];

/* eslint-disable */
var ensureArray = function ensureArray(obj) {
  return !obj ? [] : isArray(obj) ? obj : [obj];
};

ensureArray._accepts = ['ANY'];

/* eslint-disable */
// taken from lodash - https://github.com/lodash/lodash
var escapeRegExp = function escapeRegExp(str) {
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reHasRegExpChar = RegExp(reRegExpChar.source);
  str = toString(str);
  return str && reHasRegExpChar.test(str) ? str.replace(reRegExpChar, '\\$&') : str;
};

escapeRegExp._accepts = [String];

/* eslint-disable */
var filter = function filter(obj, fn) {
  var newObj = [];
  if (!isArray(obj)) return newObj;
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj.push(v);
  });
  return newObj;
};

filter._accepts = [Array];
filter._dependencies = ['dash.isArray', 'dash.forEach'];

/* eslint-disable */
var find = function find(obj, fn, def) {
  var found = def || null;
  forEach(obj, function (v, k) {
    if (fn(v, k)) {
      found = v;
      return false;
    }
  });
  return found;
};

find._accepts = [Object, Array];

/* eslint-disable */
var toPath = function toPath(pathString) {
  // taken from lodash - https://github.com/lodash/lodash
  var pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
  var pathArray = [];

  if (isString(pathString)) {
    pathString.replace(pathRx, function (match, number, quote, string) {
      pathArray.push(quote ? string : number !== undefined ? Number(number) : match);
      return pathArray[pathArray.length - 1];
    });
  }
  return pathArray;
};

toPath._accepts = [String];

/* eslint-disable */
var get$1 = function get(obj, path, defaultValue) {
  var value = obj;
  var fields = isArray(path) ? path : toPath(path);
  if (fields.length === 0) return defaultValue;

  try {
    for (var f in fields) {
      if (!value[fields[f]]) return defaultValue;else value = value[fields[f]];
    }
  } catch (err) {
    return defaultValue;
  }
  return value;
};

get$1._accepts = [Object, Array];
get$1._dependencies = ['dash.isArray', 'dash.toPath'];

/* eslint-disable */
var has = function has(obj, path) {
  var found = true;
  var fields = isArray(path) ? path : toPath(path);
  if (!fields.length) return false;
  forEach(fields, function (field) {
    if (obj[field] === undefined) {
      found = false;
      return false;
    }
    obj = obj[field];
  });
  return found;
};

has._accepts = [Object, Array];
has._dependencies = ['dash.forEach', 'dash.isArray', 'dash.toPath'];

/* eslint-disable */
var intersection = function intersection() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  return args.reduce(function (prev, cur) {
    if (!isArray(prev) || !isArray(cur)) return [];
    var left = new Set(prev);
    var right = new Set(cur);
    var i = [].concat(toConsumableArray(left)).filter(function (item) {
      return right.has(item);
    });
    return [].concat(toConsumableArray(i));
  }, args[0]);
};

intersection._accepts = [Array];

/* eslint-disable */
var isBoolean = function isBoolean(obj) {
  return obj === true || obj === false;
};

isBoolean._accepts = ['ANY'];

/* eslint-disable */
var isNumber = function isNumber(obj) {
  return typeof obj === 'number' && !isNaN(obj);
};

isNumber._accepts = ['ANY'];

/* eslint-disable */
var isPromise = function isPromise(obj) {
  return obj && isFunction(obj.then) && isFunction(obj.catch);
};

isPromise._accepts = ['ANY'];

/* eslint-disable */
// ported from https://gist.github.com/tdukart/b87afb278c41245741ae7a0c355a0a0b
var kebabCase = function kebabCase(string) {
  if (!isString(string)) return '';
  var result = string;

  // Convert camelCase capitals to kebab-case.
  result = result.replace(/([a-z][A-Z])/g, function (match) {
    return match.substr(0, 1) + '-' + match.substr(1, 1).toLowerCase();
  });

  // Convert non-camelCase capitals to lowercase.
  result = result.toLowerCase();

  // Convert non-alphanumeric characters to hyphens
  result = result.replace(/[^-a-z0-9]+/g, '-');

  // Remove hyphens from both ends
  result = result.replace(/^-+/, '').replace(/-$/, '');

  return result;
};

kebabCase._accepts = [String];

/* eslint-disable */
var range = function range() {
  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var increment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  return [].concat(toConsumableArray(Array(number).keys())).map(function (i) {
    return i * increment;
  });
};

range._accepts = [Number];

/* eslint-disable */
var keys = function keys(obj) {
  try {
    return isArray(obj) ? range(obj.length) : Object.keys(obj);
  } catch (err) {
    return [];
  }
};

keys._accepts = [Object, Array];
keys._dependencies = ['dash.isArray', 'dash.range'];

/* eslint-disable */
var mapValues = function mapValues(obj, fn) {
  var newObj = {};
  forEach(obj, function (v, k) {
    newObj[k] = fn(v);
  });
  return newObj;
};

mapValues._accepts = [Object, Array];

/* eslint-disable */
var mapWith = function mapWith(obj, fn) {
  var newObj = [];
  forEach(obj, function (v, k) {
    var value = fn(v, k);
    if (value !== undefined) newObj.push(value);
  });
  return newObj;
};

mapWith._accepts = [Object, Array];

/* eslint-disable */
var omitBy = function omitBy(obj, fn) {
  var newObj = {};
  if (!isHash(obj)) return newObj;
  forEach(obj, function (v, k) {
    if (!fn(v, k)) newObj[k] = v;
  });
  return newObj;
};

omitBy._accepts = [Object];
omitBy._dependencies = ['dash.isHash', 'dash.forEach'];

/* eslint-disable */
var pickBy = function pickBy(obj, fn) {
  var newObj = {};
  if (!isHash(obj)) return newObj;
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj[k] = v;
  });
  return newObj;
};

pickBy._accepts = [Object];
pickBy._dependencies = ['dash.isHash', 'dash.forEach'];

/* eslint-disable */
var pretty = function pretty(obj) {
  var space = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '  ';

  try {
    return JSON.stringify(obj, null, space);
  } catch (err) {
    console.error(err);
    return '';
  }
};

pretty._accepts = [Object, Array, Date];

/* eslint-disable */
var set$1 = function set(obj, path, val) {
  var fields = isArray(path) ? path : toPath(path);

  forEach(fields, function (field, idx) {
    if (idx === fields.length - 1) obj[field] = val;else if (!obj[field]) obj[field] = isNumber(field) ? [] : {};
    obj = obj[field];
  });
};

set$1._accepts = [Object, Array];
set$1._dependencies = ['dash.isArray', 'dash.isNumber', 'dash.toPath', 'dash.forEach'];

/* eslint-disable */
var stringify = function stringify(obj) {
  try {
    if (isHash(obj) || isArray(obj)) return JSON.stringify(obj);else if (has(obj, 'toString')) return obj.toString();else return String(obj);
  } catch (err) {}
  return '';
};

stringify._accepts = ['ANY'];
stringify._dependencies = ['dash.has', 'dash.isArray', 'dash.isHash'];

/* eslint-disable */
var toLower = function toLower(string) {
  return isString(string) ? string.toLowerCase() : '';
};

toLower._accepts = [String];

/* eslint-disable */
var toUpper = function toUpper(string) {
  return isString(string) ? string.toUpperCase() : '';
};

toUpper._accepts = [String];

/* eslint-disable */
var union = function union() {
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (!args.length) return [];

  try {
    var u = args.reduce(function (prev, cur) {
      if (!isArray(prev) || !isArray(cur)) return [];
      return prev.concat(cur);
    }, []);

    return [].concat(toConsumableArray(new Set(u)));
  } catch (err) {
    console.error(err);
    return [];
  }
};

union._accepts = ['ANY'];

/* eslint-disable */
var uniq = function uniq(list) {
  return isArray(list) ? [].concat(toConsumableArray(new Set(list))) : [];
};

uniq._accepts = [Array];

/* eslint-disable */
// taken from hat - https://github.com/substack/node-hat
var uuid = function uuid(bits, base) {
  if (!base) base = 16;
  if (bits === undefined) bits = 128;
  if (bits <= 0) return '0';

  var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
  for (var i = 2; digits === Infinity; i *= 2) {
    digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
  }

  var rem = digits - Math.floor(digits);

  var res = '';

  for (var _i = 0; _i < Math.floor(digits); _i++) {
    var x = Math.floor(Math.random() * base).toString(base);
    res = x + res;
  }

  if (rem) {
    var b = Math.pow(base, rem);
    var _x = Math.floor(Math.random() * b).toString(base);
    res = _x + res;
  }

  var parsed = parseInt(res, base);
  if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
    return uuid(bits, base);
  } else return res;
};

uuid._accepts = [];

/* eslint-disable */
var without = function without() {
  var output = [];
  var args = [].concat(Array.prototype.slice.call(arguments));
  if (args.length < 2) return args.length ? args[0] : [];
  var search = args.slice(1);

  forEach(args[0], function (val) {
    if (!includes(search, val)) output.push(val);
  });
  return output;
};

without._accepts = [Array];
without._dependencies = ['dash.forEach', 'dash.includes'];

/* eslint-disable */
var _dash = {
  capitalize: capitalize,
  circular: circular,
  clone: clone,
  contains: contains,
  difference: difference,
  ensureArray: ensureArray,
  escapeRegExp: escapeRegExp,
  filter: filter,
  find: find,
  forEach: forEach,
  get: get$1,
  has: has,
  includes: includes,
  intersection: intersection,
  isArray: isArray,
  isBoolean: isBoolean,
  isDate: isDate,
  isFunction: isFunction,
  isHash: isHash,
  isNumber: isNumber,
  isObject: isObject,
  isPromise: isPromise,
  isString: isString,
  kebabCase: kebabCase,
  keys: keys,
  map: map,
  mapValues: mapValues,
  mapWith: mapWith,
  merge: merge,
  omitBy: omitBy,
  pickBy: pickBy,
  pretty: pretty,
  range: range,
  set: set$1,
  stringify: stringify,
  toLower: toLower,
  toPath: toPath,
  toUpper: toUpper,
  union: union,
  uniq: uniq,
  uuid: uuid,
  without: without
};

/* eslint-disable */
var DashChain = function DashChain(obj) {
  this._value = obj;
};

DashChain.prototype.value = function () {
  return this._value;
};

var dash = function dash(obj) {
  return new DashChain(obj);
};

var _loop = function _loop(name) {
  var fn = _dash[name];
  dash[name] = fn;
  if (fn._chainable !== false) {
    DashChain.prototype[name] = function () {
      var args = [this._value].concat([].concat(Array.prototype.slice.call(arguments)));
      this._value = fn.apply(this, args);
      return fn._terminates == true ? this._value : this;
    };
  }
};

for (var name in _dash) {
  _loop(name);
}

module.exports = dash;

},{}]},{},[1])(1)
});