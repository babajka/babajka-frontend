const ARGS = require('../utils/args');

const BACKEND_URL = ARGS.backend_url || 'https://api.wir.by';

const PORT = ARGS.port || 3000;

const LOCALE_COOKIE_NAME = 'WIR_LOCALE';

const MINSK_TZ_OFFSET = 3;

// please use commonjs modules here for compatibility with server
module.exports = { BACKEND_URL, LOCALE_COOKIE_NAME, PORT, MINSK_TZ_OFFSET };
