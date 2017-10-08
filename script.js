totalNumPlayers = 1;
isEasy = true;
isHard = false;

function toggle(id1, id2) {
    let x = document.getElementById(id1);
    let y = document.getElementById(id2);

    x.style.display = 'block';
    y.style.display = 'none';
}

LB = 0;
UB = 100;
currentGuess = 0;
pop = 0;
bWidth = 120;
bHeight = 145;
sTop = 153;
sHeight = 120;

// some transitions
$(document).ready(function () {
    $("#startGame").click(function () {
        $("#title").fadeOut(800);
        setTimeout(function () {
            resetGame();
            toggle("setup", "actualGame");
            $("#game").fadeIn(1000);
        }, 1000);

    });

    $("#showHelp").click(function () {
        $("#title").fadeOut(800);
        setTimeout(function () {
            $("#help").fadeIn(1000);
        }, 1000);
    });

    $("#gameToTitle").click(function () {
        $("#game").fadeOut(800);
        setTimeout(function () {
            $("#title").fadeIn(1000);
        }, 1000);
    });

    $("#helpToTitle").click(function () {
        $("#help").fadeOut(800);
        setTimeout(function () {
            $("#title").fadeIn(1000);
        }, 1000);
    });

    $("#helpToGame").click(function () {
        resetGame();
        toggle("setup", "actualGame");
        $("#help").fadeOut(800);
        setTimeout(function () {
            $("#game").fadeIn(1000);
        }, 1000);
    });

    $("#endGame").click(function () {
        $("#game").fadeOut(800);
        setTimeout(function () {
            $("#title").fadeIn(1000);
        }, 1000);
    });

    $("#returnToMenu").click(function () {
        $("#game").fadeOut(800);
        setTimeout(function () {
            $("#title").fadeIn(1000);
        }, 1000);
    });

    $("#playAgain").click(function () {
        $("#actualGame").fadeOut(800);
        setTimeout(function () {
            resetGame();
            $("#setup").fadeIn(1000);
        }, 1000);
    });

    $('#showSettings').click(function() {
        $("#title").fadeOut(800);
        setTimeout(function () {
            $("#settings").fadeIn(1000);
        }, 1000);
    });

    //choosing settings
    $('#pickEasy').click(function() {
        $('#pickEasy').css('background', 'hsl(215,50%,65%)');
        $('#pickHarder').css('background', '#eee');
        isEasy = true;
        isHard = false;
    });
    $('#pickHarder').click(function() {
        $('#pickHarder').css('background', 'hsl(215,50%,65%)');
        $('#pickEasy').css('background', '#eee');
        isEasy = false;
        isHard = true;
    });

    $('#settingsToTitle').click(function() {
        $("#settings").fadeOut(800);
        setTimeout(function () {
            $("#title").fadeIn(1000);
        }, 1000);
    });

    $("#begin").click(function () {
        totalNumPlayers = Number(document.getElementById('numPlayers').value);

        if (totalNumPlayers < 1) {
            document.getElementById("askNumPlayers").innerText = "Haha, aren't you soooo funny...";
            setTimeout(function () {
                document.getElementById("askNumPlayers").innerText = "How many people are playing?";
            }, 1300);
            return;
        }
        else if (totalNumPlayers > 10) {
            document.getElementById("askNumPlayers").innerText = "Hmm, that's too  many  people... ";
            setTimeout(function () {
                document.getElementById("askNumPlayers").innerText = "How many people are playing?";
            }, 1300);
            return;
        }

        $("#setup").fadeOut(800);
        setTimeout(function () {
            $("#actualGame").fadeIn(1000);
        }, 1000);

        //begin the game
        if (isEasy)
        {
            LB = 0;
            UB = 100;
            //pop = Math.floor(Math.random() * 101);
            pop = 1;
        }
        else
        {
            LB = 0;
            UB = 84;
            //pop = Math.floor(Math.random() * 85);
            pop = 1;
        }
        popTheBalloon();
    });

    function popTheBalloon() {
        let i = 1;
        document.getElementById("playerCommand").innerText = "Player " + i + ", what number do you guess?";
        document.getElementById("guess").addEventListener("click", function () {

            $('#guess').prop('disabled', true);
            currentGuess = Number(document.getElementById("playerGuess").value);
            if (!isGuessValid(currentGuess)) {
                $('#guess').prop('disabled', false);
                return;
            }
            else {
                document.getElementById("guessErr").style.display = 'none';
            }

            bWidth += 10;
            bHeight += 10;
            sTop += 10;
            sHeight -= 5;

            $("#animateBalloon").animate({
                width: bWidth + 'px',
                height: bHeight + 'px'
            }, {
                duration: 2000,
                queue: false,
                complete: function() { /* Animation complete */ }
            });

            $(".balloonString").animate({
                top: sTop + 'px',
                height: sHeight + 'px'
            }, {
                duration: 2000,
                queue: false,
                complete: function() { /* Animation complete */ }
            });

            if (currentGuess === pop) {
                setTimeout(function () {
                    //pop balloon
                    $('#animateBalloon').hide("explode", {pieces: 16}, 500);
                    setTimeout(function() {
                        document.getElementById("balloon").innerText = "Player " + i + ", you lost!";
                    }, 500);
                    
                    toggle("gameOver", "guessing");
                    $('#guess').prop('disabled', false);
                    return;
                }, 2000);
            }
            else if (currentGuess < pop) {
                setTimeout(function () {
                    LB = currentGuess;
                    document.getElementById("lowest").innerText = "Lowest: " + LB;
                    i++;
                    $('#guess').prop('disabled', false);
                    if (i > totalNumPlayers) {
                        i = 1;
                    }
                    document.getElementById("playerCommand").innerText = "Player " + i + ", what number do you guess?";
                }, 2000);
            }
            else if (currentGuess > pop) {
                setTimeout(function () {
                    UB = currentGuess;
                    document.getElementById("highest").innerText = "Highest: " + UB;
                    i++;
                    $('#guess').prop('disabled', false);
                    if (i > totalNumPlayers) {
                        i = 1;
                    }
                    document.getElementById("playerCommand").innerText = "Player " + i + ", what number do you guess?";
                }, 2000);
            }
        });
    }

    function isGuessValid(guess) {
        if (currentGuess > UB || currentGuess < LB) {
            document.getElementById("guessErr").style.display = 'block';
            return false;
        }

        if (isHard)
        {
            if(currentGuess > LB+12 && currentGuess < UB-12)
            {
                document.getElementById("guessErr").style.display = 'block';
                return false;
            }
        }
        return true;
    }

    function resetGame() {
        toggle("guessing", "gameOver");
        totalNumPlayers = 1;
        document.getElementById("numPlayers").value = 1;

        LB = 0;
        UB = 100;
        currentGuess = 0;
        document.getElementById("playerGuess").value = 0;
        pop = 0;
        bWidth = 120;
        bHeight = 145;
        sTop = 153;
        sHeight = 120;

        $('#animateBalloon').show();

        document.getElementById("lowest").innerText = "Lowest: 0";
        document.getElementById("highest").innerText = "Highest: 100";
        document.getElementById("balloon").innerText = "";
        if (isEasy)
        {
            document.getElementById('level').innerText = "Easy";
        }
        else
        {
            document.getElementById('level').innerText = 'Harder';
        }
    }

    // speech recognition
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ '1' ];
for (var i = 1; i < 101; i++)
{
    colors.push(i.toString());
}

var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

$('#testVoice').click(function() {
  recognition.start();
  console.log('Ready to receive a color command.');
});

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;

  console.log('Result received: ' + color + '.');
  if (color === "one")
  {
      color = 1;
  }
//   bg.style.backgroundColor = color;
    var isValidNumber = isNaN(color);
    console.log('Valid: ' + isValidNumber);
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  console.log("I didn't recognise that color.");
}

recognition.onerror = function(event) {
  console.log('Error occurred in recognition: ' + event.error);
}
});


