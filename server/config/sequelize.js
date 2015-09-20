var Sequelize = require('sequelize');

var sequelize = new Sequelize('wwm',
                              'wwm',
                              'wwm',
                              {
                                host: 'localhost',
                                dialect: 'sqlite',
                                pool: {
                                  max: 5,
                                  min: 0,
                                  idle: 10000
                                },
                                storage: 'server/db/wwm.sqlite'
                              }
                             );

module.exports = sequelize;
