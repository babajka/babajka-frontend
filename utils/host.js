import env from './env';

const HOSTS = {
  production: 'wir.by',
  staging: 'dev.wir.by',
};

export default HOSTS[env] || 'localhost';
