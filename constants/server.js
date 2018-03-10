const BACKEND_AUTH = process.env.BABAJKA_BACKEND_AUTH;
const BACKEND_URL = process.env.BABAJKA_BACKEND_URL || 'http://api.wir.by';
const SESSION_COOKIE = 'connect.sid';

// please use commonjs modules here for compatibility with server
module.exports = { BACKEND_AUTH, BACKEND_URL, SESSION_COOKIE };
