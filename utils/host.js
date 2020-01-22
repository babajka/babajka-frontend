import env from './env';

const HOSTS = {
  production: 'https://prod.wir.by',
  staging: 'https://dev.wir.by',
};

export default HOSTS[env] || 'http://localhost:3000';
