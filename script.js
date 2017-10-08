totalNumPlayers = 0;

function startGame() {
    toggle("game", "title");
    resetGame();
}

function showHelp() {
    toggle("help", "title");
}

function gameToTitle() {
    toggle("title", "game");
}

function helpToTitle() {
    toggle("title", "help");
}

function helpToGame() {
    toggle("game", "help");
    resetGame();
}

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
            if (currentGuess === pop)
            {
                //pop balloon
                document.getElementById("balloon").innerText = "POP POP >:)";
                toggle("gameOver", "guessing");
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

function resetGame() {
    toggle("setup", "actualGame");
    totalNumPlayers = 0;
    document.getElementById("numPlayers").value = 0;

    LB = 0;
    UB = 100;
    currentGuess = 0;
    pop = 0;

    document.getElementById("lowest").innerText = "Lowest: 0";
    document.getElementById("highest").innerText = "Highest: 100";
    document.getElementById("balloon").innerText = "a balloon";
    toggle("guessing", "gameOver");
}

function playAgain() {
    resetGame();
}