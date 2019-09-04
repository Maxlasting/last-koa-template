const change2Arr = target => Array.isArray(target) ? target : [target]

const _covert = middleware => (target, key, descriptor) => {
  target[key] = change2Arr(middleware).concat(change2Arr(target[key]))
  return descriptor
}

module.exports = { change2Arr, _covert }
