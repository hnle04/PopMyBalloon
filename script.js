totalNumPlayers = 1;

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

function beginGame() {
    totalNumPlayers = Number(document.getElementById('numPlayers').value);

    if (totalNumPlayers < 1)
    {
        document.getElementById("askNumPlayers").innerText = "Haha, very funny. So how many people are ACTUALLY playing?";
        return;
    }
    else if (totalNumPlayers > 10)
    {
        document.getElementById("askNumPlayers").innerText = "Hmm, that may be too many people...so how many people are playing?";
        return;
    }

    toggle("actualGame", "setup");

    //begin the game
    LB = 0;
    UB = 100;
    pop = Math.floor(Math.random() * 101);

    popTheBalloon();
}

function popTheBalloon() {
    let i = 1;
    document.getElementById("playerCommand").innerText = "Player " + i + ", what number do you guess?";
    document.getElementById("guess").addEventListener("click", function() {
            currentGuess = Number(document.getElementById("playerGuess").value);
            if (!isGuessValid(currentGuess))
            {
                return;
            }
            else
            {
                document.getElementById("guessErr").style.display = 'none';
            }

            if (currentGuess === pop)
            {
                //pop balloon
                document.getElementById("balloon").innerText = "POP POP >:)";
                toggle("gameOver", "guessing");
                return;
            }
            else if (currentGuess < pop)
            {
                LB = currentGuess;
                document.getElementById("lowest").innerText = "Lowest: " + LB;
                i++;
                //inflate balloon
            }
            else if (currentGuess > pop)
            {
                UB = currentGuess;
                document.getElementById("highest").innerText = "Highest: " + UB;
                i++;
                //inflate balloon
            }
            
            if (i > totalNumPlayers)
            {
                i = 1;
            }
            document.getElementById("playerCommand").innerText = "Player " + i + ", what number do you guess?";
        });
}

function isGuessValid(guess) {
    if (currentGuess > UB || currentGuess < LB)
    {
        document.getElementById("guessErr").style.display = 'block';
        return false;
    }
    return true;
}

function resetGame() {
    toggle("setup", "actualGame");
    totalNumPlayers = 1;
    document.getElementById("numPlayers").value = 1;

    LB = 0;
    UB = 100;
    currentGuess = 0;
    document.getElementById("guess").value = 0;
    pop = 0;

    document.getElementById("lowest").innerText = "Lowest: 0";
    document.getElementById("highest").innerText = "Highest: 100";
    document.getElementById("balloon").innerText = "a balloon";
    toggle("guessing", "gameOver");
}

function playAgain() {
    resetGame();
}

// some cool effects
$(document).ready(function() {
    $("#startGame").click(function() {
        resetGame();
        $("#title").fadeOut(1000);
        $("#game").fadeIn(2500);
    });

    $("#showHelp").click(function() {
        $("#title").fadeOut(1000);
        $("#help").fadeIn(2500); 
    });

    $("#gameToTitle").click(function() {
        $("#game").fadeOut(1000);
        $("#title").fadeIn(2500);  
    });

    $("#helpToTitle").click(function() {
        $("#help").fadeOut(1000);
        $("#title").fadeIn(2500);
    });

    $("#helpToGame").click(function() {
        resetGame();
        $("#help").fadeOut(1000);
        $("#game").fadeIn(2500);
        
    });
});
