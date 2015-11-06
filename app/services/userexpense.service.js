var UserExpense = require('../models/userexpense.model');

exports.create = function(userData, next) {
    var user = new UserExpense(userData);
    user.save(function(dbError, data) {
        next(dbError, data);
    });
};

exports.getAllRecords = function(next) {
    UserExpense.find(function(dbError, data) {
        next(dbError, data);
    });
};
