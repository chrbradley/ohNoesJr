// set-up editor for challenge
var initialText = "/*\n" +
"Let's write a function called filter.\n\n" +
"filter is a function used to iterate over items of an array.\n" +
"filter passes each item in the array to a callback function.\n\n" +
"This callback function is sometimes refered to as a predicate or test function which just means that the function will only ever return either true or false.\n\n" +
"If the predicate function returns true an item, it is added to a new array. When filter is finished iterating, it will return the new array.\n\n" +
"An example use case might look like this:\n\n" +
"var numbers = [7, 2, 4, 3, 8, 1, 9];\n" +
"filter(numbers, function(num) { if (num > 3) return true;});\n\n" +
"// [7, 4, 8, 9]\n\n" +
"We blocked in the structure for filter below...Give it a shot!\n\n" +
"*/\n\n" +
"var filter = function(array, test) {\n" +
"    // your code goes here\n\n" +
"}\n";

editor.setValue(initialText);
editor.setValue(initialText, 1);
editor.focus();
editor.gotoLine(24);

// challenge specific code
var filterChallenge = new Challenge();

// set-up required and prohibited nodes
filterChallenge.addToWhitelist("ArrayExpression", "ForStatement", "IfStatement", "ReturnStatement");
filterChallenge.addToBlacklist("WhileStatement");


// initialize timer and event listener
var timer = null;
editor.getSession().on('change', function(e) {
    // prevent parsing from blocking the user
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    // launch timer when user is finished typing
    timer = setTimeout(function() {
      var codeToParse = editor.getValue();
      var ast = esprima.parse(codeToParse);

      var pMessage = document.getElementById("message");

      // basic demonstration logic
      if(!filterChallenge.verifyStructure(ast, 'FunctionExpression', 'BlockStatement', 'VariableDeclaration', 'ArrayExpression')) {
        pMessage.innerHTML = "Let\'s start by creating a container to store our result.";
      } else if (filterChallenge.verifyType(ast, 'WhileStatement')) {
        pMessage.innerHTML = "I guess you could use a while loop, but let\'s try a for loop instead.";
      } else if (!filterChallenge.verifyType(ast, 'ForStatement')) {
        pMessage.innerHTML = "Hey, how about trying a loop to iterate over your array...";
      } else if (!filterChallenge.verifyStructure(ast, 'ForStatement', 'IfStatement')) {
        pMessage.innerHTML = "You should probably put a conditional inside your for loop ;)";
      } else if (!filterChallenge.verifyType(ast, 'ReturnStatement')) {
        pMessage.innerHTML = "Hmmm, we\'re not getting anything returned yet.";
      } else if (filterChallenge.verifyBlacklist(ast)) {
        pMessage.innerHTML = "Uh-Oh! You\'re using something you shouldn\'t";
      } else {
        pMessage.innerHTML = "Sweet, this looks pretty good!";
      }

    }, 2000);
});
