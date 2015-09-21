module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/wwm',
      deployTo: '/var/www/wwm',
      repositoryUrl: 'https://github.com/chapati23/walk-with-me.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--del'],
      keepReleases: 2,
      shallowClone: true
    },
    production: {
      servers: 'app@46.101.195.46'
    }
  });

  shipit.task('build_docker', function() {
    var command = './run_as_docker.sh';
    return shipit.remote(command, shipit.currentPath);
  });

  shipit.on('deploy:publish', function() {
    shipit.start('build_docker');
  });
};
