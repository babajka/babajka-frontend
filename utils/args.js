const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'env', type: String },
  { name: 'backend_url', type: String },
  { name: 'port', type: Number },
];

module.exports = () => commandLineArgs(optionDefinitions);
