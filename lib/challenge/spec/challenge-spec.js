/* global challenge, describe, it, expect, should */

describe('Challenge()', function () {
    'use strict';
    var challenge;
    var ast01 = {
      "type": "Program",
      "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "answer"
                    },
                    "init": {
                        "type": "BinaryExpression",
                        "operator": "*",
                        "left": {
                            "type": "Literal",
                            "value": 6,
                            "raw": "6"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 7,
                            "raw": "7"
                        }
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "i"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 0,
                            "raw": "0"
                        }
                    }
                ],
                "kind": "var"
            },
            "test": {
                "type": "BinaryExpression",
                "operator": "<",
                "left": {
                    "type": "Identifier",
                    "name": "i"
                },
                "right": {
                    "type": "Identifier",
                    "name": "answer"
                }
            },
            "update": {
                "type": "UpdateExpression",
                "operator": "++",
                "argument": {
                    "type": "Identifier",
                    "name": "i"
                },
                "prefix": false
            },
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "IfStatement",
                        "test": {
                            "type": "BinaryExpression",
                            "operator": "===",
                            "left": {
                                "type": "BinaryExpression",
                                "operator": "%",
                                "left": {
                                    "type": "Identifier",
                                    "name": "i"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 3,
                                    "raw": "3"
                                }
                            },
                            "right": {
                                "type": "Literal",
                                "value": 0,
                                "raw": "0"
                            }
                        },
                        "consequent": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": false,
                                            "object": {
                                                "type": "Identifier",
                                                "name": "console"
                                            },
                                            "property": {
                                                "type": "Identifier",
                                                "name": "log"
                                            }
                                        },
                                        "arguments": [
                                            {
                                                "type": "Literal",
                                                "value": "We have a factory of 3!!!",
                                                "raw": "'We have a factory of 3!!!'"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        "alternate": null
                    }
                ]
            }
        },
        {
            "type": "EmptyStatement"
        }
      ]
    };
    var ast02 = {
      "type": "Program",
      "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "jimbo"
                    },
                    "init": {
                        "type": "Literal",
                        "value": "Beam",
                        "raw": "'Beam'"
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "sum"
                    },
                    "init": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                            "type": "Literal",
                            "value": 15,
                            "raw": "15"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 7,
                            "raw": "7"
                        }
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "IfStatement",
            "test": {
                "type": "BinaryExpression",
                "operator": "===",
                "left": {
                    "type": "BinaryExpression",
                    "operator": "%",
                    "left": {
                        "type": "Identifier",
                        "name": "i"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 3,
                        "raw": "3"
                    }
                },
                "right": {
                    "type": "Literal",
                    "value": 0,
                    "raw": "0"
                }
            },
            "consequent": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "MemberExpression",
                                "computed": false,
                                "object": {
                                    "type": "Identifier",
                                    "name": "console"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "log"
                                }
                            },
                            "arguments": [
                                {
                                    "type": "Literal",
                                    "value": "We have a factory of 3!!!",
                                    "raw": "'We have a factory of 3!!!'"
                                }
                            ]
                        }
                    }
                ]
            },
            "alternate": null
        },
        {
            "type": "EmptyStatement"
        }
      ]
};

    it('exists', function() {
        expect(Challenge).to.be.a('function');
    });

    beforeEach(function() {
        challenge = new Challenge();
    });

    it('should hav a verifyType method', function() {
        expect(challenge.verifyType).to.be.a('function');
    });

    it('should verify whether a type exists in the AST object', function() {
        expect(challenge.verifyType(ast01, 'WhileStatement')).to.equal(false);
        var result = false;
        if (challenge.verifyType(ast01, 'ForStatement')) {
            result = true;
        }
        expect(result).to.equal(true);
    });

    it('should have a whitelist ', function() {
        expect(challenge.whitelist).to.be.a('object');
    });

    it('should have an addToWhitelist method', function() {
        expect(challenge.addToWhitelist).to.be.a('function');
    });

    it('should store elements added to the whitelist', function() {
        challenge.addToWhitelist('ForStatement', 'IfStatement');
        expect(challenge.whitelist.ForStatement).to.equal(true);
        expect(challenge.whitelist.IfStatement).to.equal(true);
    });

    it('should not store elements to the whitelist if they exist on the blacklist ', function() {
        challenge.addToBlacklist('ForStatement');
        challenge.addToWhitelist('ForStatement', 'IfStatement');
        expect(challenge.whitelist.ForStatement).to.equal(undefined);
        expect(challenge.whitelist.IfStatement).to.equal(true);
    });

    it('should have a verifyWhitelist method', function() {
        expect(challenge.verifyWhitelist).to.be.a('function');
    });

    it('should verify whether whitelist elements exist in the code', function() {
        challenge.addToWhitelist('ForStatement');
        expect(challenge.verifyWhitelist(ast01)).to.equal(true);
        expect(challenge.verifyWhitelist(ast02)).to.equal(false);
    });

    it('should have a blacklist ', function() {
        expect(challenge.blacklist).to.be.a('object');
    });

    it('should have an addToBlacklist method', function() {
        expect(challenge.addToBlacklist).to.be.a('function');
    });

    it('should store elements added to the blacklist', function() {
        challenge.addToBlacklist('ForStatement', 'IfStatement');
        expect(challenge.blacklist.ForStatement).to.equal(true);
        expect(challenge.blacklist.IfStatement).to.equal(true);
    });

    it('should not store elements to the blacklist if they exist on the whitelist ', function() {
        challenge.addToWhitelist('IfStatement');
        challenge.addToBlacklist('ForStatement', 'IfStatement');
        expect(challenge.blacklist.ForStatement).to.equal(true);
        expect(challenge.blacklist.IfStatement).to.equal(undefined);
    });

    it('should have a verifyBlacklist method', function() {
        expect(challenge.verifyBlacklist).to.be.a('function');
    });

    it('should verify whether blacklist elements exist in the code', function() {
        challenge.addToBlacklist('ForStatement');
        expect(challenge.verifyBlacklist(ast01)).to.equal(true);
        expect(challenge.verifyBlacklist(ast02)).to.equal(false);
    });

    it('should have a verifyStructure method', function() {
        expect(challenge.verifyStructure).to.be.a('function');
    });

    it('should verify the basic structure of the code', function() {
        expect(challenge.verifyStructure(ast01, 'ForStatement', 'WhileStatement')). to.equal(false);
        expect(challenge.verifyStructure(ast01, 'ForStatement', 'IfStatement')).to. equal(true);
        expect(challenge.verifyStructure(ast01, 'ForStatement', 'IfStatement', 'console')).to.equal(true);
    });

});
