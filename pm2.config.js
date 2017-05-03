const ENV = process.env.ENV || 'development';

module.exports = {
  apps: [{
    name: 'ponto-server',
    watch: ENV === 'development' ? ['dist'] : false,
    ignore_watch: ['dist/server.log'],
    log_file: 'dist/server.log',
    merge_logs: true,
    instances: ENV === 'development' ? 1 : -1,
    exec_mode: 'cluster',
    script: './dist/server.js'
  }]
};
