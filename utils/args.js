const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'backend-url', type: String },
  { name: 'port', type: Number },
];

module.exports = commandLineArgs(optionDefinitions);
