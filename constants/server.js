const BACKEND_URL = process.env.BABAJKA_BACKEND_URL || 'http://api.wir.by';
const SESSION_COOKIE = 'csid';

// please use commonjs modules here for compatibility with server
module.exports = { BACKEND_URL, SESSION_COOKIE };
