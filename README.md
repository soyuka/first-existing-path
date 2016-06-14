# First existing path

[![Build Status](https://travis-ci.org/soyuka/firstExistingPath.svg?branch=master)](https://travis-ci.org/soyuka/firstExistingPath)

Get the first existing path from an array of strings

## Install

```
npm install first-existing-path [--save]
```

## Usage

```js
const firstExistingPath = require('first-existing-path')

firstExistingPath([
  process.env.CONFIG, '~/.config', '.config'
], function(err, path) {

})
```

Or as a promise:

```js
const firstExistingPath = require('first-existing-path')

firstExistingPath([
  process.env.CONFIG, '~/.config', '.config'
])
.then((path) => {

})
```

Or synchronous:

```js
const firstExistingPath = require('first-existing-path')

let path = firstExistingPath.sync([
  process.env.CONFIG, '~/.config', '.config'
])
```

## API

```js
/**
 * firstExistingPath
 * Get back the first path that does exist
 * @param {Array} paths
 * @param {Function} cb optional callback
 * @return {String|Boolean} Promise the founded path or false
 */
function firstExistingPath(paths, cb)

/**
 * firstExistingPath sync
 * Get back the first path that does exist
 * @param {Array} paths
 * @return {String|Boolean} the founded path or false
 */

function firstExistingPathSync(paths)
```

## License

MIT
