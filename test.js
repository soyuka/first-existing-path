'use strict'
const assert = require('assert')
const firstExistingPath = require('.')
const firstExistingPathSync = require('.').sync
const name = `${require('./package.json').name} test`

let should = (reason, mode) => {
  reason = `should ${reason}`

  return {
    fail(mode) {
      return `\u001b[31m  ✖ ${reason}\u001b[0m (${mode})`
    },
    pass(mode) {
      console.log(`\u001b[92m  ✓ ${reason}\u001b[0m (${mode})`)

      return Promise.resolve()
    }
  }
}

console.log(`${name} start (pid: ${process.pid})`)
console.time(name)

let end = () => {
  console.timeEnd(name)
}

Promise.all([
  ((reason) => {
    let paths = [
        'nothing',
        'index.js',
        'test.js',
    ]

    let test = (e, mode) => assert(e === 'index.js', reason.fail(mode)) || reason.pass(mode)

    test(firstExistingPathSync(paths), 'sync') === 'index.js'

    return firstExistingPath(paths, (err, path) => test(path, 'callback'))
    .then(e => test(e, 'promise'))
  })(should`find index.js`),

  ((reason) => {
    let paths = [
        'nothing',
        'inexistant',
    ]

    let test = (e, mode) => assert(e === false, reason.fail(mode)) || reason.pass(mode)

    test(firstExistingPathSync(paths), 'sync')

    return firstExistingPath(paths, (err, path) => test(path, 'callback'))
    .then(e => test(e, 'promise'))
  })(should`not find the path and therefore be falsy`),

  ((reason) => {
    let test = (e, mode) => {
      assert(e.name == 'AssertionError' && e.message == 'Argument Paths must be an array', reason.fail(mode)) || reason.pass(mode)
    }

    try {
      firstExistingPathSync({})
    } catch(e) {
      test(e, 'sync')
    }

    firstExistingPath({}, e => test(e, 'callback'))
    .then(e => assert(false, should`not be called`.fail``))
    .catch(e => test(e, 'promise'))
  })(should`throw because argument must be path`)
])
.then(end)
.catch((e) => {
  console.error(e.message)
  console.error(`  Expected "${e.expected}" (${e.operator}) actual "${e.actual}"`)
  console.error(e.stack.split('\n').filter((e, i) => !~[0,1].indexOf(i)).join('\n'))
  end()
  process.exit(1)
})
