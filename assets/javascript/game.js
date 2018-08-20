var letters = /^[A-Za-z]+$/;

var artist1 = {
    "name": "Barbara Kruger",
    "artwork": "assets/images/art1.jpg",
    "info": "https://en.wikipedia.org/wiki/Barbara_Kruger"
}

var artist2 = {
    "name": "Guerrilla Girls",
    "artwork": "assets/images/art2.jpg",
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

artists = [artist1, artist2, artist3, artist4, artist5];
var guessed = [];
var characters = 1;
var guesses = 10;


$(document).ready(function () {
    var chosenartist = artists[Math.floor(Math.random() * artists.length)];
    $("#artcontain").html("<img src='" + chosenartist.artwork + "' id='artblur' class='img-thumbnail' />");
    for (i = 0; i < chosenartist.name.length; i++) {
        console.log(chosenartist.name[i]);
        if (chosenartist.name[i] === " ") {
            $("#guess-space").append("<span id=" + [i] + ">&nbsp;&nbsp;</span>");
        } else {
            $("#guess-space").append("<span id=" + [i] + ">_ </span>");
        }
    }

    /*    $(document).on("keyup", function (e) {
           console.log(e.key);
           if (e.key.match(letters)) {
               letterCheck();
   
           } else {
               alert("That's not a letter, silly!");
           }
       }); */




    $(document).on("keyup", function (e) {
        var stroke = e.key;
        if (stroke.match(letters)) {
            if (guessed.includes(stroke)) {
                alert("You already guessed that!");
            } else {
                guessed.push(stroke);
                var index = [];
                for (j = 0; j < chosenartist.name.length; j++) {
                    if (chosenartist.name[j] === stroke) {
                        index.push([j]);
                    }
                }


                if (index.length != 0) {
                    for (k = 0; k < index.length; k++) {
                        $("#" + index[k]).html(stroke);
                        characters++;
                    }
                } else {
                    guesses--;
                    $("#remaining").html(guesses);
                    $("#wrongguesses").append(stroke + ", ");
                }

                if (characters === chosenartist.name.length) {
                    $("#artcontain").html("<img src='" + chosenartist.artwork + "' id='artclear' class='img-thumbnail' />");
                    $("#message").html("You won!");
                }
            }
        } else {
            alert("That's not a letter, silly!");
        }
    });




});