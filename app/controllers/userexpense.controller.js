'use strict';

/*
    Expense controller for inserting, updating and deleting user records.
*/

var UserConfig = require('../services/userexpense.service');

/* Create Record in Database */
exports.CreateRecord = function(data, callback) {
    UserConfig.create(data, function(err, res) {
        if (!err) {
            callback(null, res);
        } else {
            callback(err);
        }
    });
};

/* Get All Records from Database */
exports.GetAllRecords = function(callback) {
    UserConfig.getAllRecords(function(err, res) {
        if (!err) {
            callback(null, res);
        } else {
            callback(err);
        }
    });
};
