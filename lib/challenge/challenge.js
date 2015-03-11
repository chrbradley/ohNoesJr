/*! challenge v0.0.0 - MIT license */
(function() {
    'use strict';
}());

var Challenge = function () {
    this.whitelist = {};
    this.blacklist = {};
};

Challenge.prototype.verifyType = function(obj, target) {
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
            var result = this.verifyType(obj[k], target);
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
        if (this.blacklist[args[i]]) {
            console.log(args[i] + ' conflicts with your blacklist');
        } else {
            this.whitelist[args[i]] = true;
        }
    }
};

// requires an ast object
Challenge.prototype.verifyWhitelist = function(ast) {
    // check for every element in whitelist
    for (var k in this.whitelist) {
      if (this.verifyType(ast, k)) {
        return true;
      }
     }
     return false;
};

Challenge.prototype.addToBlacklist = function() {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
      if (this.whitelist[args[i]]) {
        console.log(args[i] + ' conflicts with your whitelist');
      } else {
        this.blacklist[args[i]] = true;
      }
     }
};

Challenge.prototype.verifyBlacklist = function(ast) {
    // check for every element in blacklist
    for (var k in this.blacklist) {
       if (this.verifyType(ast, k)) {
        return true;
      }
    }
    return false;
};

// this takes unlimited arguments
// it expects the first argument to be an AST obj
// and all subsuquent arguments should match AST types
Challenge.prototype.verifyStructure = function(ast) {
    var args = Array.prototype.slice.call(arguments);
    // work through arguments left to right
    // if we find one arg, set object to arg and
    // search for next arg within that ast
    for (var i = 1; i < args.length; i++) {
      ast = this.verifyType(ast, args[i]);
      if (!ast) {
        return false;
      }
    }
    return true;
};

