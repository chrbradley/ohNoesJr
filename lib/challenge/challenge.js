/*! challenge v0.0.0 - MIT license */
(function() {
  'use strict';
}());

var Challenge = function () {
  this.whitelist = [];
  this.blacklist = [];
};

Challenge.prototype._verify = function(obj, target) {
  // check every key's value
  for (var k in obj) {
    // if key's value is not typeof Object check
    // if value matches target, if so return obj
    if (typeof obj[k] !== 'object') {
      if (obj[k] === target) {
        return obj;
      }
    } else {
      // key's value is typeof Object
      // send it back into verify
      var result = this._verify(obj[k], target);
      if (result) {
        return result;
      }
    }
  }
  // no match returns false
  return false;
};

Challenge.prototype.addToWhitelist = function() {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this.whitelist.push(args[i]);
  }
  // TODO: handle blacklist conflicts
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
  // TODO: handle whitelist conflicts
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

// this takes unlimited arguments
// it expects the first argument to be an AST obj
// and all subsuquent arguments should match AST types
Challenge.prototype.verifyStructure = function(obj) {
  var args = Array.prototype.slice.call(arguments);
  // work through arguments left to right
  // if we find one arg, set object to arg and
  // search for next arg within that obj
  for (var i = 1; i < args.length; i++) {
    obj = this._verify(obj, args[i]);
    if (!obj) {
      return false;
    }
  }
  return true;
};

