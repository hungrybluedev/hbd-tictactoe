export var Turn;
(function (Turn) {
    Turn[Turn["X"] = 0] = "X";
    Turn[Turn["O"] = 1] = "O";
})(Turn || (Turn = {}));
export var Player;
(function (Player) {
    Player[Player["Human"] = 0] = "Human";
    Player[Player["CPU"] = 1] = "CPU";
})(Player || (Player = {}));
export var Status;
(function (Status) {
    Status[Status["Loop"] = 0] = "Loop";
    Status[Status["XWon"] = 1] = "XWon";
    Status[Status["OWon"] = 2] = "OWon";
    Status[Status["Draw"] = 3] = "Draw";
})(Status || (Status = {}));
