const getArgs = require('../utils/args');

const ARGS = getArgs();

const BACKEND_URL = ARGS.backend_url || 'http://api.wir.by';
const SESSION_COOKIE = 'csid';

// please use commonjs modules here for compatibility with server
module.exports = { BACKEND_URL, SESSION_COOKIE };
