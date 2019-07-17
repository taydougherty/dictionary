// require necessary packages
var fs = require("fs");
var readline = require('linebyline');
rl = readline('rawDictionaryData.txt');

// set variable for definition to append into
var defn = "";

// set variable for reading the lines in definition if multiple
var inDefn = false;

// open the csv file used to append data
fs.open('editedDictionaryData.csv', 'a', (err, fd) => {
    if (err) throw err;

    // read through each line from the txt file
    rl.on('line', function (line) {

        // if the line has all capital letters it is a word
        var word = line.match(/[A-Z]+\;?\'?S?\s?\-?[A-Z]+?/g);

        // if a word exists, return the array as a string
        if (word !== null) {

            word = word.join("");
            // console.log(word);

            // apend the word to the file
            fs.appendFile(fd, word + "\n", function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    // console.log("added to the csv!")
                }
            });
        }

        // if the lines are still in the definition, append the line to the definition string
        if (inDefn) {
            defn += line;
        }

        // check if the line begin with "Defn:" for definition
        if (line.slice(0, 5) === "Defn:") {
            // if true, append line to definition string
            defn += line;
            // set variable to true
            inDefn = true;
        }

        // if new line is not part of the definition, append the definition string to the file and set inDefinition to false
        if (inDefn && (line === "")) {

            inDefn = false;
            fs.appendFile(fd, defn + "\n\n", function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    // console.log("added to the csv!")
                }
            });

            defn = "";
        }
    })
        .on('error', function (err) {
            console.log('Error while reading file.', err);
        })
        .on('close', function (line) {
            // when finished reading the lines
            inDefn = false;
            // console.log(definition);

            // append the remaining definition string into the csv file
            fs.appendFile(fd, defn, function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    // console.log("added to the csv!")
                }
            });

            // set the definition back to an empty string
            defn = "";

            // close the csv file
            fs.close(fd, (err) => {
                if (err) throw err;
            });
        });
});