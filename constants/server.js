const getArgs = require('../utils/args');

const ARGS = getArgs();

const BACKEND_URL = ARGS.backend_url || 'http://api.wir.by';
const MARKUP_URL = 'http://localhost:3001';
const SESSION_COOKIE = 'csid';

// please use commonjs modules here for compatibility with server
module.exports = { BACKEND_URL, MARKUP_URL, SESSION_COOKIE };
