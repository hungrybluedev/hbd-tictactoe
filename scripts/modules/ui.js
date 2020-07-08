import { symbol_for } from "./pure_functions.js";
import { iterate_game_loop } from "./logic.js";
export const initialize_grid_buttons = (state) => {
    state.buttons.forEach((button) => {
        button.onclick = () => {
            button.disabled = true;
            button.innerText = symbol_for(state.turn);
            iterate_game_loop(state);
        };
    });
};
export const reset_buttons = (state) => {
    state.buttons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("winning-line");
        button.innerHTML = "";
    });
};
export const disable_all_buttons = (state) => {
    state.buttons.forEach((button) => {
        button.disabled = true;
    });
};
export const update_turn_message = (state) => {
    state.message.innerText = symbol_for(state.turn) + "’s turn!";
};
export const add_breathing_animation = (state) => {
    state.message.classList.add("breathe");
    state.mode_button.classList.add("breathe");
    state.reset_button.classList.add("breathe");
};
