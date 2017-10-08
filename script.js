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
});
