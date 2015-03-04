/*! challenge v0.0.0 - MIT license */
(function() {
  'use strict';
}());

var Challenge = function () {
  this.whitelist = [];
  this.blacklist = [];
};

Challenge.prototype.addToWhitelist = function() {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this.whitelist.push(args[i]);
  }
};

Challenge.prototype._verify = function(obj, target) {
  // check every key's value
  for (var k in obj) {
    // if key's value is not typeof Object check
    // if value matches target
    if (typeof obj[k] !== 'object') {
      if (obj[k] === target) {
          return true;
      }
    } else {
      // key's value is typeof Object
      // send it back into verify
      if (this._verify(obj[k], target)) {
          return true;
      }
    }
  }
  // no match returns false
  return false;
};

Challenge.prototype.verifyWhitelist = function(ast) {
  // check for every element in whitelist
  for (var i = 0; i < this.whitelist.length; i++) {
    if (!this._verify(ast, this.whitelist[i])) {
      return false;
    }
  }
  return true;
};

Challenge.prototype.addToBlacklist = function() {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this.blacklist.push(args[i]);
  }
};

Challenge.prototype.verifyBlacklist = function(ast) {
  // check for every element in blacklist
  for (var i = 0; i < this.blacklist.length; i++) {
    if (!this._verify(ast, this.blacklist[i])) {
      return false;
    }
  }
  return true;
};
