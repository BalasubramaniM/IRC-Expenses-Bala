'use strict';

/*
  Expense Model Schema
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var expenseSchema = new Schema({
  admin: String,
  username: String,
  type: String,
  amount: Number,
  created_at: Date,
  updated_at: Date
},{
	versionKey: false
});

// on every save, add the date
expenseSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// Create a model using the userSchema
var UserExpense = mongoose.model('UserExpense', expenseSchema);

module.exports = UserExpense;