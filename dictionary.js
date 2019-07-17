// read the raw data file
// review data structure
// need: word, definition (bare minimum)
// break the lines based off of the word and definition
// send the data back to the csv file using append file and a line break to seperate
// what differentiates and what is a pattern and what is not
// nested for loops are inefficient
// check for what is 
// conditional statements
// pattern - all words are capitals
// figure out which data structure to use (objects vs arrays)

var fs = require("fs");

var text = fs.readFileSync("rawDictionaryData.txt", "utf-8");
var word = text.match(/[A-Z]+\;?\'?S?\s?\-?[A-Z]+?\r/g);
// console.log(word);

for (var i = 0; i < word.length-1; i++) {
  var first = text.indexOf(word[i]);
  var second = text.indexOf(word[i+1]);

  var findDefn = text.slice(first, second).split("\n\r");

  // console.log(word[i]);

  fs.appendFile("editedDictionaryData.csv", word[i], function(err) {
    if (err) {
      return console.log(err);
    }
    // } else {
    //   console.log("added to the csv!")
    // }
  });

  findDefn.forEach(element => {
    if (element.slice(0,7) === "\nDefn: ") {
      var result = element;
      // console.log(element);

      fs.appendFile("editedDictionaryData.csv", result, function(err) {
        if (err) {
          return console.log(err);
        } else {
          console.log("added to the csv!")
        }
      });
    }
  });
};