export default {
  development: {
    'dialect': 'sqlite',
    'storage': './db.development.sqlite',
  },
  test: {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql',
  },
  production: {
    'username': 'mike',
    'password': 'Husky',
    'database': 'seta',
    'host': 'amp.pharm.mssm.edu',
    'dialect': 'mysql',
  },
};
