if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("sw.js")
        .catch((err) => console.log(err));
}
import * as constants from "./modules/constants.js";
var Turn;
(function (Turn) {
    Turn[Turn["X"] = 0] = "X";
    Turn[Turn["O"] = 1] = "O";
})(Turn || (Turn = {}));
var Player;
(function (Player) {
    Player[Player["Human"] = 0] = "Human";
    Player[Player["CPU"] = 1] = "CPU";
})(Player || (Player = {}));
var Status;
(function (Status) {
    Status[Status["Loop"] = 0] = "Loop";
    Status[Status["XWon"] = 1] = "XWon";
    Status[Status["OWon"] = 2] = "OWon";
    Status[Status["Draw"] = 3] = "Draw";
})(Status || (Status = {}));
const symbol_for = (turn) => {
    return turn === Turn.X ? constants.x_sym : constants.o_sym;
};
const encoding_for = (buttons) => {
    let symbols = Array(9);
    for (const button of buttons) {
        let current_symbol;
        switch (button.innerText) {
            case constants.x_sym:
                current_symbol = "X";
                break;
            case constants.o_sym:
                current_symbol = "O";
                break;
            default:
                current_symbol = " ";
        }
        symbols.push(current_symbol);
    }
    return symbols.join("");
};
const initialize_buttons = () => {
    const buttons = new Array(9);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i] = document.getElementById((i + 1).toString());
    }
    buttons.forEach((button) => {
        button.onclick = () => {
            button.disabled = true;
            button.innerText = symbol_for(state.turn);
            iterate_game_loop();
        };
    });
    return buttons;
};
const initialize_message = () => {
    const element = document.getElementById("message");
    if (!element) {
        alert("Could not load webpage. Please reconnect and try again.");
        return new HTMLElement();
    }
    else {
        return element;
    }
};
const initialize_button = (name) => {
    const element = document.getElementById(name + "-button");
    if (!element) {
        alert("Could not load webpage. Please reconnect and try again.");
        return new HTMLElement();
    }
    else {
        return element;
    }
};
const initialize_covering = () => {
    const element = document.getElementById("covering");
    if (!element) {
        alert("Could not load webpage. Please reconnect and try again.");
        return new HTMLElement();
    }
    else {
        return element;
    }
};
let reset_buttons = (state) => {
    state.buttons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("winning-line");
        button.innerHTML = "";
    });
};
let disable_all_buttons = (state) => {
    state.buttons.forEach((button) => {
        button.disabled = true;
    });
};
const update_turn_message = (state) => {
    state.message.innerText = symbol_for(state.turn) + "’s turn!";
};
const add_breathing_animation = (state) => {
    state.message.classList.add("breathe");
    state.mode_button.classList.add("breathe");
    state.reset_button.classList.add("breathe");
};
const update_status = (state) => {
    if (is_game_drawn(state)) {
        state.message.innerHTML = "<strong>Draw!</strong>";
        state.status = Status.Draw;
        add_breathing_animation(state);
        return;
    }
    if (has_a_player_won(state)) {
        state.status = state.turn === Turn.X ? Status.XWon : Status.OWon;
        add_breathing_animation(state);
        disable_all_buttons(state);
        return;
    }
    state.status = Status.Loop;
};
const new_game = () => {
    let temporary_button_array = initialize_buttons();
    const state = {
        buttons: temporary_button_array,
        turn: Turn.X,
        status: Status.Loop,
        message: initialize_message(),
        player_x: Player.Human,
        player_o: Player.Human,
        encoding: encoding_for(temporary_button_array),
        mode_button: initialize_button("mode"),
        reset_button: initialize_button("reset"),
        covering: initialize_covering(),
    };
    update_turn_message(state);
    reset_buttons(state);
    state.message.classList.remove("breathe");
    state.mode_button.classList.remove("breathe");
    state.reset_button.classList.remove("breathe");
    state.covering.classList.remove("active");
    return state;
};
const toggle_player_mode = (previous_state) => {
    let previous_player2 = previous_state.player_o;
    let state = new_game();
    state.mode_button.classList.toggle("pvc");
    state.mode_button.classList.toggle("pvp");
    state.player_o = previous_player2 === Player.CPU ? Player.Human : Player.CPU;
    return state;
};
const has_a_player_won = (state) => {
    const symbol = state.turn === Turn.X ? "X" : "O";
    for (let locations of constants.cases) {
        let count = 0;
        for (let location of locations) {
            if (state.encoding[location] === symbol) {
                count++;
            }
        }
        if (count !== 3) {
            continue;
        }
        state.message.innerText = symbol_for(state.turn) + " won!🎉";
        for (let location of locations) {
            state.buttons[location].classList.add("winning-line");
        }
        return true;
    }
    return false;
};
const is_game_drawn = (state) => {
    for (let button of state.buttons) {
        if (!button.disabled) {
            return false;
        }
    }
    return !has_a_player_won(state);
};
const iterate_game_loop = () => {
    state.encoding = encoding_for(state.buttons);
    update_status(state);
    if (state.status !== Status.Loop) {
        state.covering.classList.add("active");
        return;
    }
    let next_turn = state.turn === Turn.X ? Turn.O : Turn.X;
    state.turn = next_turn;
    update_turn_message(state);
};
let state = new_game();
state.reset_button.onclick = () => {
    state = new_game();
};
state.mode_button.onclick = () => {
    state = toggle_player_mode(state);
};
const info_button = document.getElementById("info-button");
if (info_button) {
    info_button.onclick = () => {
        window.open("https://github.com/hungrybluedev/hbd-tictactoe");
    };
}
