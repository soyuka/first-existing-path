const exists = require('@soyuka/exists')
const existsSync = require('@soyuka/exists-sync')

function isArray(v) { require('assert')(Array.isArray(v), "Argument Paths must be an array") }

/**
 * firstExistingPath
 * Get back the first path that does exist
 * @param {Array} paths
 * @param {Function} cb optional callback
 * @return {String|Boolean} Promise the founded path or false
 */
function firstExistingPath(paths, cb) {

  try {
    isArray(paths)
  } catch(e) {
    if (cb) {
      cb(e)
    }

    return Promise.reject(e)
  }

  let i = 0;
  let l = paths.length
  let promises = []

  for(i; i < l; i++) {
    if(paths[i]) {
      promises.push(exists(paths[i]))
    }
  }

  return Promise.all(promises)
  .then(values => {
    let path = paths[values.findIndex(b => b === true)] || false

    if (cb) {
      cb(null, path)
    }

    return path
  })
}

/**
 * firstExistingPath sync
 * Get back the first path that does exist
 * @param {Array} paths
 * @return {String|Boolean} the founded path or false
 */
firstExistingPath.sync = function firstExistingPathSync(paths) {
  isArray(paths)

  let i = 0;
  let l = paths.length

  for(i; i < l; i++) {
    if(paths[i] && existsSync(paths[i])) {
      return paths[i]
    }
  }

  return false
}

module.exports = firstExistingPath
