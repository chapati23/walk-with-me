var Sequelize = require('sequelize'),
    sequelize = require('../config/sequelize'),
    Bcrypt    = require('bcryptjs');

var SQLUser = function(){
  var columns = {
    email: {
      type: Sequelize.STRING(500),
      allowNull: false
    },
    encryptedPassword: {
      type: Sequelize.STRING,
      field: 'encrypted_password',
      allowNull: false
    },
    admin: {
      type: Sequelize.BOOLEAN
    }
  };

  return sequelize.define('user', columns, { freezeTableName: true });
}();

var User = function () {
  //Sync
  SQLUser.sync().then(function (err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  });

  var validate = function (request, username, password, callback) {
    var promise = findWhere({email: username});

    promise.then(function(data){
      if(data == null){
        return callback(null, false);
      }
      Bcrypt.compare(password, data.dataValues.encryptedPassword, function (err, isValid) {
        callback(err, isValid, data.dataValues);
      });
    });

    promise.catch(function(){
      return callback(null, false);
    });
  };

  var findWhere = function(condition) {
    return SQLUser.find({where: condition});
  };

  var all = function () {
    return SQLUser.findAll();
  };

  var create = function (params) {
    if(params.email === null ||
       params.password === null ||
       params.password.length < 6 ||
       params.password !== params.passwordConfirmation){
      return false;
    }
    var encryptedPassword = bcrypt.hashSync(params.password, 10);
    var promise = user.create({email: params.email,
                               encryptedPassword: encryptedPassword})
    return promise;
  };

  return {
    all: all,
    findWhere: findWhere,
    validate: validate,
    create: create
  }
};

module.exports = new User();
