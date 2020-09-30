// ./routes/index.js
const contracts = require('./contracts');

module.exports = app => {
  app.use('/contracts', contracts)
}