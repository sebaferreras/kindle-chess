var vm = require('vm');
var fs = require('fs');
var path = require('path');

function loadModules(names) {
  var context = { parseInt: parseInt, Math: Math, Infinity: Infinity, JSON: JSON, Date: Date };
  var source = names.map(function (name) {
    return fs.readFileSync(path.join(__dirname, '..', name), 'utf8');
  }).join('\n');

  vm.runInNewContext(source, context);

  return context;
}

var failures = 0;

function check(condition, message) {
  if (condition) {
    console.log('ok   ' + message);
  } else {
    console.log('FAIL ' + message);
    failures++;
  }
}

function equal(actual, expected, message) {
  check(JSON.stringify(actual) === JSON.stringify(expected), message + ' → ' + JSON.stringify(actual));
}

function summary() {
  console.log(failures ? failures + ' failure(s)' : 'all tests passed');
  process.exitCode = failures ? 1 : 0;
}

module.exports = { loadModules: loadModules, check: check, equal: equal, summary: summary };
