import _ from 'lodash'

export function mergeClass (c, def = {}) {
  let obj = {}
  c = _.isString(c) ? c.split(/\s+/) : c
  if (_.isArray(c)) {
    _.forEach(c, (n) => { obj[n] = true })
  } else if (_.isObject(c)) {
    obj = c
  }

  return _.merge({}, def, obj)
}

export default {
  mergeClass
}
