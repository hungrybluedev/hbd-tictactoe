import * as constants from "./constants.js";
import { Turn, Status, Player } from "./types.js";
import { encoding_for, retrieve_grid_buttons, retrieve_ui_button, retrieve_message_box, retrieve_canvas, symbol_for, } from "./pure_functions.js";
import { add_breathing_animation, disable_all_buttons, initialize_grid_buttons, update_turn_message, reset_buttons, } from "./ui.js";
export const new_game = () => {
    const state = {
        buttons: retrieve_grid_buttons(),
        turn: Turn.X,
        status: Status.Loop,
        message: retrieve_message_box(),
        player_x: Player.Human,
        player_o: Player.Human,
        encoding: "         ",
        mode_button: retrieve_ui_button("mode"),
        reset_button: retrieve_ui_button("reset"),
        covering: retrieve_canvas(),
    };
    initialize_grid_buttons(state);
    update_turn_message(state);
    reset_buttons(state);
    state.message.classList.remove("breathe");
    state.mode_button.classList.remove("breathe");
    state.reset_button.classList.remove("breathe");
    state.covering.classList.remove("active");
    return state;
};
export const toggle_player_mode = (previous_state) => {
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
    for (let location of state.encoding) {
        if (location === " ") {
            return false;
        }
    }
    return !has_a_player_won(state);
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
export const iterate_game_loop = (state) => {
    const old_encoding = state.encoding;
    state.encoding = encoding_for(state.buttons);
    if (state.encoding === old_encoding) {
        return;
    }
    update_status(state);
    if (state.status !== Status.Loop) {
        state.covering.classList.add("active");
        return state;
    }
    let next_turn = state.turn === Turn.X ? Turn.O : Turn.X;
    state.turn = next_turn;
    update_turn_message(state);
};
