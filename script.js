function startGame() {
    toggle("game", "title");
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

function toggle(id1, id2) {
    let x = document.getElementById(id1);
    let y = document.getElementById(id2);

    x.style.display = 'block';
    y.style.display = 'none';
}