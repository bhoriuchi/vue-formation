/* eslint-disable */
import forEach from './dash.forEach'
import isArray from './dash.isArray'
import toPath from './dash.toPath'

let has = function (obj, path) {
  let found = true
  let fields = isArray(path) ? path : toPath(path)
  if (!fields.length) return false
  forEach(fields, (field) => {
    if (obj[field] === undefined) {
      found = false
      return false
    }
    obj = obj[field]
  })
  return found
}

has._accepts = [Object, Array]
has._dependencies = [
  'dash.forEach',
  'dash.isArray',
  'dash.toPath'
]

export default has
