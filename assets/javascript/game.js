var letters = /^[abcdefghijklmnopqrstuvwxyzñABCDEFGHIJKLMNOPQRSTUVWXYXÑ]+$/;

var artist1 = {
    "name": "Barbara Kruger",
    "artwork": "assets/images/art1.jpg",
    "art_name": "Untitled (Your Body is a Battleground)",
    "info": "https://en.wikipedia.org/wiki/Barbara_Kruger"
}

var artist2 = {
    "name": "Guerrilla Girls",
    "artwork": "assets/images/art2.jpg",
    "art_name": "The Advantages Of Being A Woman Artist",
    "info": "https://www.guerrillagirls.com/"
}

var artist3 = {
    "name": "Johanna Toruño",
    "artwork": "assets/images/art3.jpg",
    "art_name": "The Unapologetically Brown Series",
    "info": "https://theunapologeticallybrownseries.format.com/"
}

var artist4 = {
    "name": "Panmela Castro",
    "artwork": "assets/images/art4.jpg",
    "art_name": "Mural for Frestas, Sorocaba, Brasil 2018",
    "info": "https://panmelacastro.carbonmade.com/"
}

var artist5 = {
    "name": "Patti Maciesz",
    "artwork": "assets/images/art5.jpg",
    "art_name": "Bill the Patriarchy",
    "info": "https://www.billthepatriarchy.com/"
}

var artist6 = {
    "name": "Yayoi Kusama",
    "artwork": "assets/images/art6.jpg",
    "art_name": "Aftermath of Obliteration of Eternity",
    "info": "http://yayoi-kusama.jp/e/information/"
}

var artist7 = {
    "name": "Gillian Wearing",
    "artwork": "assets/images/art7.jpg",
    "art_name": "Self-Portrait as My Mother, Jean Gregory; Self-Portrait as My Father, Brian Wearing",
    "info": "https://en.wikipedia.org/wiki/Gillian_Wearing"
}

var artist8 = {
    "name": "Janine Antoni",
    "artwork": "assets/images/art8.jpg",
    "art_name": "Lick and Lather",
    "info": "http://www.janineantoni.net/"
}

var artist9 = {
    "name": "Graciela Iturbide",
    "artwork": "assets/images/art9.jpg",
    "art_name": "Mujer Ángel, Sonora Desert",
    "info": "http://www.gracielaiturbide.org/en/"
}

var artist10 = {
    "name": "Diane Arbus",
    "artwork": "assets/images/art10.jpg",
    "art_name": "Identical Twins, Roselle, New Jersey, 1967",
    "info": "https://en.wikipedia.org/wiki/Diane_Arbus"
}


var artists = [artist1, artist2, artist3, artist4, artist5, artist6, artist7, artist8, artist9, artist10];
var chosenartist;
var chosenlower;
var guessed = [];
var guesses = 10;
var characters = 1;
var index = [];
var stroke;

//Reset all variables
function resetVar() {
    console.log("1.reset variables");
    console.log("stroke ", stroke);
    guessed.length = 0;
    index.length = 0;
    characters = 1;
    guesses = 10;
    stroke = "";
}

//Set up a new game (reset html)
function newGame() {
    $("#start").hide();
    console.log("2. set up new game");
    $("#guess-space").html("");
    $("#artinfo").html("");
    $("#learnmore").html("");
    $("#wrongguesses").html("");
    $("#message").html("You have <span id='remaining'>10</span> guesses remaining.");
    $("#wronghead").html("Wrong letters:");
}

function pickArtist() {
    console.log("3. pick artist");
    chosenartist = artists[Math.floor(Math.random() * artists.length)];
    chosenlower = chosenartist.name.toLowerCase();
    $("#artcontain").html("<img src='" + chosenartist.artwork + "' id='artblur' class='img-thumbnail' />");
    for (i = 0; i < chosenartist.name.length; i++) {
        if (chosenartist.name[i] === " ") {
            $("#guess-space").append("<span id=" + [i] + ">&nbsp;&nbsp;</span>");
        } else {
            $("#guess-space").append("<span id=" + [i] + ">_ </span>");
        }
    }
    console.log(chosenartist.name)
}


function indexMatch() {
    console.log("6. checking for matches in the word");
    //Then, take that letter and check each letter of the word to see whether it matches.
    for (j = 0; j < chosenlower.length; j++) {
        //And if it matches, add its position to the "index" array.
        if (chosenlower[j] === stroke) {
            index.push([j]);
        }
    }
}

function printLetters() {
    /* If there are numbers in "index", add each letter to the space matching that id number, and also add 1 to 
"characters" to count how many correct letters we have */
    console.log(index);
    console.log("7. printing letters");
    if (index.length > 0) {
        for (k = 0; k < index.length; k++) {
            $("#" + index[k]).html(chosenartist.name[index[k]]);
            characters++;
        }
        index.length = 0;
    } else {
        /* Or if there are no numbers in "index", that means that the guess was wrong, so 1 will be subtracted from variable 
   "guesses" (the number of guesses remaining), and the letter will be added to the list of wrong letters.*/
        guesses--;
        $("#remaining").html(guesses);
        $("#wrongguesses").append(stroke + ", ");
    }
    console.log(index);
    console.log(stroke);
    stroke = "";
    console.log(stroke);
}

/* Check whether guesses is at 0, and if so, show what we want to see upon losing! */

function checkLoss() {
    console.log("checking if lost");
    console.log(stroke);
    if (guesses === 0) {
        resetVar();
        $("#artcontain").html("<img src='" + chosenartist.artwork + "' id='artclear' class='img-thumbnail' />");
        $("#message").html("You lost! If you found this difficult, it might be interesting to <a href='https://www.theguardian.com/lifeandstyle/2017/feb/06/how-the-art-world-airbrushed-female-artists-from-history' target='_blank'>ask yourself why</a> you haven't heard of these artists.");
        $("#artinfo").html("The featured piece was <span style='font-style: italic;'>" + chosenartist.art_name + "</span> by " + chosenartist.name + ".");
        $("#learnmore").html("Learn more about " + chosenartist.name + " <a href='" + chosenartist.info + "' target='_blank'>here</a>.");
        $("#start").html("Click here to play again!");
        $("#start").show();
    }
}

/* Then, check if the number of characters matches the total number in the word, and if it does, 
                    display the stuff we need to see upon winning. */
function checkWin() {
    console.log("checking if won");
    console.log(stroke);
    console.log(chosenartist.name.length + "is correct length");
    console.log(characters + "are the characters i have guessed");
    if (characters === chosenartist.name.length) {
        resetVar();
        $("#artcontain").html("<img src='" + chosenartist.artwork + "' id='artclear' class='img-thumbnail' />");
        $("#message").html("You won!");
        $("#artinfo").html("This is <span style='font-style: italic;'>" + chosenartist.art_name + "</span> by " + chosenartist.name + ".");
        $("#learnmore").html("Learn more about " + chosenartist.name + " <a href='" + chosenartist.info + "' target='_blank'>here</a>.");
        $("#start").html("Click here to play again!");
        $("#start").show();
    }
}


$(document).ready(function () {
    $("#start").on("click", function () {
        chosenartist = "";
        resetVar();
        newGame();
        pickArtist();
        $(document).on("keyup", function (e) {
            stroke = e.key;
            /* Check whether the key is a letter */ 
            if (e.keyCode === 186 || e.keyCode >= 65 && e.keyCode <= 90) {
                console.log("5. check for repeated guess or add guess");
                /*If the selected letter has already been added to the "guessed" array 
                (because you already guessed it), alert that you already guessed it*/
                if (guessed.includes(stroke)) {
                    console.log("You already guessed that!");
                } else {
                    //Or if it's not already in the guessed array, add it
                    guessed.push(stroke);
                    //Match guessed letter to positions in word
                    indexMatch();
                    //Show letters (or: subtract guesses if letter is wrong)
                    printLetters();
                    //Check if we've lost (does "guesses" equal 0?)
                    checkLoss();
                    //Check if we've won (does "characters" equal letters in word?)
                    checkWin();
                }
            } else {
                console.log("not a letter");
                stroke = "";
                return;
            }
            stroke="";
        });

    });
});
