if (require.main === module) {
  require('./bin/shamedia')
} else {
  module.exports = require('./lib/shamedia')
}
