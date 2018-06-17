const { ARGS } = require('../utils/args');

const BACKEND_URL = ARGS.backend_url || 'http://api.wir.by';
const MARKUP_URL = ARGS.debug_styles ? `http://localhost:${ARGS.debug_styles}` : '';
const SESSION_COOKIE = 'csid';

// please use commonjs modules here for compatibility with server
module.exports = { BACKEND_URL, MARKUP_URL, SESSION_COOKIE };
