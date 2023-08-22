(function (modules) {
  function _require(id) {
    const module = { exports: {} }
    modules[id](module, module.exports, _require)
    return module.exports
  }
  _require('0')
})({
  {{#modules}}
  '{{id}}': function (module, exports, _require) {
{{{code}}}
  },
  {{/modules}}
})
