// set-up editor for challenge
var initialText = "/*\n" +
"Let's write a function called filter.\n\n" +
"filter is a function used to iterate over items of an array.\n" +
"filter passes each item in the array to a callback function.\n\n" +
"This callback function is sometimes refered to as a predicate or test function which just means that the function will only ever return either true or false.\n\n" +
"If the predicate function returns true for that item, it is passed to a new array. When filter is finished iterating, it will return the new array.\n\n" +
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



var timer = null;
editor.getSession().on('change', function(e) {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    timer = setTimeout(function() {
      var codeToParse = editor.getValue();
      var ast = esprima.parse(codeToParse);

      if (!filterChallenge.verifyWhitelist(ast)) {
        console.log('Uh-Oh! We are missing some nodes. :( ');
      }

      if (filterChallenge.verifyBlacklist(ast)) {
        console.log('Uh-Oh!');
      } else {
        console.log('Sweet, no nodes on our blacklist found!');
      }

    }, 1000);
});