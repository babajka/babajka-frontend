const BACKEND_URL = process.env.BABAJKA_BACKEND_URL || 'http://dev.wir.by';
const SESSION_COOKIE = 'connect.sid';

// please use commonjs modules here for compatibility with server
module.exports = { BACKEND_URL, SESSION_COOKIE };
